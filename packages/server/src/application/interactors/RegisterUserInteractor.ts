import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/repositories/UserRepository';
import { User } from '@domain/entities/User.entity';
import { IHashGateway } from '../gateways/IHashGateway';
import { RegisterUserDto } from '../dto/RegisterUserDto';

@Injectable()
export class RegisterUserInteractor {
  constructor(
    private userRepository: UserRepository,
    @Inject('IHashGateway') private hashGateway: IHashGateway,
  ) {}

  async execute({ username, email, password }: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await this.hashGateway.hash(password);
    const user = User.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
}
