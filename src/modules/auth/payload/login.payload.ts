import { ApiModelProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Login Payload Class
 */
export class LoginPayload {
  /**
   * Username field
   */
  @ApiModelProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  /**
   * Password field
   */
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
