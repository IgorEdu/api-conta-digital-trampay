import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description: 'ID do usuário',
      example: '1c5685c1-17c2-40bb-8168-36885ca9de3e',
    })
    userId: string;
  }