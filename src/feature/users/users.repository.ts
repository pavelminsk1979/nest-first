import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor() {}

  findUserRepository(userId: string) {
    return [{ id: 1 }, { id: 4 }].find((e) => e.id === +userId);
  }
}
