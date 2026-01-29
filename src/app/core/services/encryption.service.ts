import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private secretKey = 'my-secret-key'; // استخدم مفتاح قوي ومخزن بأمان

  constructor() {}

  // تشفير النصوص
  encrypt(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new Error('Invalid value for encryption. It must be a non-empty string.');
    }
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  // فك التشفير
  decrypt(encryptedValue: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
