import { Injectable } from '@nestjs/common';
import { UserDocument } from './domain';

@Injectable()
export class UsersRepository {
  findUserRepository(userId: string) {
    return [{ id: 1 }, { id: 4 }].find((e) => e.id === +userId);
  }

  async createUser(newUser: UserDocument) {
    return newUser.save();
  }
}
