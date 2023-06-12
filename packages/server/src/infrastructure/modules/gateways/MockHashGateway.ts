import { IHashGateway } from '../../../application/gateways/IHashGateway';

export class MockHashGateway implements IHashGateway {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async hash(text: string): Promise<string> {
    // Return a fixed or predetermined value for testing purposes
    return 'mockedHashedPassword';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compare(plain: string, hash: string): Promise<boolean> {
    // Implement the comparison logic if needed in your tests
    return Promise.resolve(plain.includes('true'));
  }
}
