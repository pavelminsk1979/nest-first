import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './domain';
import { Model } from 'mongoose';
import { CreateUserInputModelType } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    /* вот тут моделька инжектится*/
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    protected usersRepository: UsersRepository,
  ) {}

  findUserService(userId: string) {
    return this.usersRepository.findUserRepository(userId);
  }

  async createUser(dto: CreateUserInputModelType) {
    /*    тут создаю нового юзера---использую МОДЕЛЬКУ ЮЗЕРА(это
        класс и при создании классу передаю данные в dto (это 
        обьект с значениями которые прислал фронтенд для зоздания нового юзера )) КЛАСС-МОДЕЛЬКА  ЭТО ЗАВИСИМОСТЬ -ПОЭТОМУ В НУТРИ МЕТОДА
         ОБРАЩЕНИЕ ИДЕТ ЧЕРЕЗ  this*/
    const newUser = new this.userModel(dto);
    return this.usersRepository.createUser(newUser);
  }
}
