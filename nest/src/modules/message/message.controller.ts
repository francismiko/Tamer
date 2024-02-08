import {
	Body,
	Controller,
	Get,
	Header,
	Param,
	Post,
	Query,
	Res,
} from "@nestjs/common";
import type { Message } from "@prisma/client";
import type { Response } from "express";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get(":id")
	getMessage(@Param("id") id: string): Promise<Message | null> {
		return this.messageService.getMessage(id);
	}

	@Get()
	getMessagesByChatId(@Query("chat_id") chat_id: string): Promise<Message[]> {
		return this.messageService.getMessagesByChatId(chat_id);
	}

	@Post()
	@Header("Content-Type", "text/plain")
	async generateAIMessage(
		@Res() res: Response,
		@Body() body: { message: string; chatId: string },
	): Promise<void> {
		const { message, chatId } = body;
		const chunks: Uint8Array[] = [];
		const stream = await this.messageService.callModelStream(chatId, message);

		for await (const chunk of stream) {
			chunks.push(chunk);
			res.write(chunk);
		}

		res.end();

		await this.messageService.createChatMessages({
			humanMessage: message,
			AIMessage: Buffer.concat(chunks).toString(),
			chatId,
		});
	}
}
