import * as crypto from 'crypto';
import { ValueTransformer } from 'typeorm';

/**
 * Password Transformer Class
 */
export class PasswordTransformer implements ValueTransformer {
  /**
   * Value to transform to
   * @param {string} value string to hash
   */
  to(value: string) {
    return crypto.createHmac('sha256', value).digest('hex');
  }

  /**
   * Grabs the string to hash from
   * @param {string} value from string
   */
  from(value: string) {
    return value;
  }
}
