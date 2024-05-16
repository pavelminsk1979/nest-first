import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './domain';
import { Model } from 'mongoose';
import { CreateUserInputModelType } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    /* вот тут моделька инжектится
    именно декоратор  @InjectModel  определяет
    что происходит инжектирование
      -- (User.name)  регистрируется по имени
       также как в   app.module  в  imports
       и это будет скорей всего строка 'user'
       --<UserDocument> это тип умного обьекта
       ---userModel - это  свойство текущего класса ,
       это будет ТОЖЕ КЛАСС(это Моделька от mongoose).*/
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    protected usersRepository: UsersRepository,
  ) {}

  findUserService(userId: string) {
    return this.usersRepository.findUserRepository(userId);
  }

  async createUser(dto: CreateUserInputModelType): Promise<User> {
    /*    тут создаю нового юзера---использую МОДЕЛЬКУ ЮЗЕРА(это
        класс и при создании классу передаю данные в dto (это 
        обьект с значениями которые прислал фронтенд для зоздания нового юзера )) КЛАСС-МОДЕЛЬКА  ЭТО ЗАВИСИМОСТЬ -ПОЭТОМУ В НУТРИ МЕТОДА
         ОБРАЩЕНИЕ ИДЕТ ЧЕРЕЗ  this*/
    const newUser: UserDocument = new this.userModel(dto);
    return this.usersRepository.createUser(newUser);
  }
}
