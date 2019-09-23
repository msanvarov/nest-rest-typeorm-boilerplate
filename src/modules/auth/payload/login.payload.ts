import { ApiModelProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
