import { Module } from "@nestjs/common";
import { ChatModelController } from "./chatModel.controller";
import { ChatModelService } from "./chatModel.service";

@Module({
	controllers: [ChatModelController],
	providers: [ChatModelService],
})
export class ChatModelModule {}
