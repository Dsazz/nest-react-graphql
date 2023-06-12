import { genSalt, hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { IHashGateway } from '../../../application/gateways/IHashGateway';

@Injectable()
export class BcryptHashGateway implements IHashGateway {
  async hash(text: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(text, salt);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
