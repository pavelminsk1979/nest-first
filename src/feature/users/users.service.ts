import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  findUserService(userId: string) {
    return this.usersRepository.findUserRepository(userId);
  }
}
