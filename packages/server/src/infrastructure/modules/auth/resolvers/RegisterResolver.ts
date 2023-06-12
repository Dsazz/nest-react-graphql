import { ValidateNested } from 'class-validator';
import {
  ArgsType,
  Field,
  Resolver,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { User } from '@domain/entities/User.entity';
import { RegisterUserDto } from '../../../../application/dto/RegisterUserDto';
import { RegisterUserInteractor } from '../../../../application/interactors/RegisterUserInteractor';

@ArgsType()
class RegisterArgs {
  @Field(() => RegisterUserDto)
  @ValidateNested()
  @Type(() => RegisterUserDto)
  user: RegisterUserDto;
}

@Resolver()
export class RegisterResolver {
  constructor(private registerUserInteractor: RegisterUserInteractor) {}

  @Mutation(() => User)
  async register(@Args() { user }: RegisterArgs) {
    return await this.registerUserInteractor.execute(user);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
