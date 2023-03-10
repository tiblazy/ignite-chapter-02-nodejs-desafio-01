import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = {
      id: uuidV4(),
      email,
      name,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return this.users.find(({ id }) => id === user.id);
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    Object.assign(receivedUser, { admin: true, updated_at: new Date() });

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
