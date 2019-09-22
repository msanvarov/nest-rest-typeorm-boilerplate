import { ApiModelProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsAlpha()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
