import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@domain/entities/User.entity';

import { ValidateNested } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LoginUserInteractor } from '../../../../application/interactors/LoginUserInteractor';
import { LoginUserDto } from '../../../../application/dto/LoginUserDto';

@ArgsType()
class LoginArgs {
  @Field(() => LoginUserDto)
  @ValidateNested()
  @Type(() => LoginUserDto)
  user: LoginUserDto;
}

@Resolver()
export class LoginResolver {
  constructor(private loginUserInteractor: LoginUserInteractor) {}

  @Mutation(() => User)
  async login(@Args() { user }: LoginArgs) {
    return await this.loginUserInteractor.execute(user);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
