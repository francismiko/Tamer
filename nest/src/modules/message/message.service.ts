import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BaseChatModel } from 'langchain/dist/chat_models/base';
import { IterableReadableStream } from 'langchain/dist/util/stream';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { ChatPromptTemplate } from 'langchain/prompts';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  getMessage(id: string): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  getMessagesByChatId(chat_id: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { chat_id },
      orderBy: { create_at: 'asc' },
    });
  }

  async useChatModel(chatId: string): Promise<BaseChatModel> {
    const chatModel = await this.prisma.chatModel.findUnique({
      where: { chat_id: chatId },
      select: { model: true },
    });

    return new ChatOpenAI(
      {
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: chatModel?.model,
        temperature: 1,
        timeout: 5 * 1000,
        streaming: true,
      },
      {
        baseURL: process.env.OPENAI_API_PROXY_URL,
      },
    );
  }

  // async modelChain(chatModel: BaseChatModel): Promise<void> {
  // const systemTemplate =
  //   'You are a helpful assistant that translates {input_language} to {output_language}.';
  // const humanTemplate = '{text}';
  // const chatPrompt = ChatPromptTemplate.fromMessages([
  //   ['system', systemTemplate],
  //   ['human', humanTemplate],
  // ]);
  // const formattedChatPrompt = await chatPrompt.formatMessages({
  //   input_language: 'English',
  //   output_language: 'French',
  //   text: 'I love programming.',
  // });
  // }

  async generateModelStream(
    chatModel: BaseChatModel,
    message: string,
  ): Promise<IterableReadableStream<Uint8Array>> {
    const parser = new HttpResponseOutputParser({
      contentType: 'text/event-stream',
    });

    const systemTemplate = `你是一名辅助用户自学的英语教授, 负责回答学生问题以及根据要求给他出题
    他想达到的英语水平是:{level},
    结合现有的真题, 按照如下的话术给他出题:
    1. 题目难度等级:<{level}>
    2. 题目类型:
    3. 题目内容:
    4. 题目答案:
    请给出你的回答:
    `;
    const humanTemplate = '{text}';

    const chatPrompt = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['human', humanTemplate],
    ]);

    const formattedChatPrompt = await chatPrompt.formatMessages({
      level: 'CET-4',
      text: message,
    });

    const stream = await chatModel.pipe(parser).stream(formattedChatPrompt);

    return stream;
  }

  streamDecode(chunks: Uint8Array[]): string {
    return chunks
      .map((chunk) =>
        new TextDecoder()
          .decode(chunk, { stream: true })
          .split('\n\n')
          .map((line) => line.match(/data: "(.*)"/)?.[1] || '')
          .join(''),
      )
      .join('');
  }

  async createChatMessages({
    humanMessage,
    AIMessage,
    chatId,
  }: {
    humanMessage: string;
    AIMessage: string;
    chatId: string;
  }): Promise<void> {
    await this.prisma.message.create({
      data: {
        content: humanMessage,
        sender: 'Human',
        status: 'Done',
        chat_id: chatId,
      },
    });

    await this.prisma.message.create({
      data: {
        content: AIMessage,
        sender: 'AI',
        status: 'Done',
        chat_id: chatId,
      },
    });
  }
}
