import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from 'class-validator';

export class RegisterPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
