import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  static create({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    return user;
  }
}
