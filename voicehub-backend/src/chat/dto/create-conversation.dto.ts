/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  agentId: string; // MongoDB ObjectId as string

  @IsString()
  @IsNotEmpty()
  userId: string; // For now "temp-user", later real user ID
}
