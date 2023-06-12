import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/repositories/UserRepository';
import { User } from '@domain/entities/User.entity';
import { IHashGateway } from '../gateways/IHashGateway';
import { LoginUserDto } from '../dto/LoginUserDto';

@Injectable()
export class LoginUserInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('IHashGateway') private hashGateway: IHashGateway,
  ) {}

  async execute({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('No user found with this email.');
    }

    const isPasswordValid = await this.hashGateway.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    }

    return user;
  }
}
