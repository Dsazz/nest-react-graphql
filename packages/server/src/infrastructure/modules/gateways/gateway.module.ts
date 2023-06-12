import { Module } from '@nestjs/common';
import { BcryptHashGateway } from './BcryptHashGateway';

@Module({
  providers: [
    {
      provide: 'IHashGateway',
      useClass: BcryptHashGateway,
    },
  ],
})
export class GatewayModule {}
