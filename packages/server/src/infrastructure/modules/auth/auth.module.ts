import { Module } from '@nestjs/common';
import { LoginResolver } from './resolvers/LoginResolver';
import { RegisterResolver } from './resolvers/RegisterResolver';
import { RegisterUserInteractor } from '../../../application/interactors/RegisterUserInteractor';
import { LoginUserInteractor } from '../../../application/interactors/LoginUserInteractor';
import { BcryptHashGateway } from '@infrastructure/modules/gateways/BcryptHashGateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@domain/repositories/UserRepository';
import { User } from '@domain/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'IHashGateway',
      useClass: BcryptHashGateway,
    },
    UserRepository,
    LoginUserInteractor,
    LoginResolver,
    RegisterUserInteractor,
    RegisterResolver,
  ],
})
export class AuthModule {}
