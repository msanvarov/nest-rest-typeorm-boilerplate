import * as crypto from 'crypto';
import { ValueTransformer } from 'typeorm';

/**
 * Password Transformer Class
 */
export class PasswordTransformer implements ValueTransformer {
  /**
   * Value to transform to
   * @param value string to hash
   */
  to(value) {
    return crypto.createHmac('sha256', value).digest('hex');
  }

  /**
   * Grabs the string to hash
   * @param value value to return
   */
  from(value) {
    return value;
  }
}
