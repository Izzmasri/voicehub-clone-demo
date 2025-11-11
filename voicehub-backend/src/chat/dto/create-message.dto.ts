/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { MessageSender } from '../schemas/message.schema';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @IsEnum(MessageSender)
  sender: MessageSender;

  @IsString()
  @IsNotEmpty()
  text: string;
}
