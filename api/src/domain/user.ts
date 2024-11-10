import { v7 as uuid } from 'uuid';

type UserProps = {
  name: string;
  email: string;
  password: string;
};

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({ id, name, email, password, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static create(props: UserProps): User {
    const user = new User({
      id: uuid(),
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  }
}
