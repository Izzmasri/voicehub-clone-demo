/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateAgentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Description must be at least 4 characters long' })
  description?: string;
}
