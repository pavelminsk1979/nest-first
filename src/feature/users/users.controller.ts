import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
/* @Controller()-- декоратор,
 который применяется к классу , указывает,
 что этот класс является контроллером. Контроллеры в NestJS отвечают за
  обработку HTTP-запросов и определение маршрутов
  В аргументе   ('users')   это URL на который
  запросы придут и данный controller  их  обработает
  ОБЯЗАТЕЛЬНО ДОБАВЛЯТЬ UsersController В ФАЙЛ app.module
  controllers: [AppController, UsersController]*/
export class UsersController {
  /* Здесь используется механизм внедрения зависимостей.
    Когда экземпляр AppController создается, NestJS автоматически
   внедряет экземпляр AppService*/
  constructor(protected usersService: UsersService) {}

  /*  ЭТО ПРИМЕР ГЕТ ЗАПРОСА БЕЗ КВЕРИ ПАРАМЕТРОВ
   @Get() /!*@Get() является декоратором, который применяется
     к методу данному. Он указывает, что этот метод будет
     обрабатывать HTTP GET-запросы
     @Get()   в скобках пусто поэтому URL будет таким  "/"
      на фронтенд возвращается строка
      ---ЕСЛИ ГЕТ ЗАПРОС ПРИЛЕТИТ ТО ВЫЗОВЕТСЯ МЕТОД getUsers*!/
    getUsers() {
      return [{ id: 1 }, { id: 4 }];
    }*/
  /*  //////////////////////////////////////////////////////////
    /!*ЭТО ГЕТ ЗАПРОС С КВЕРИ ПАРАМЕТРАМИ
    ОДИН ПАРАМЕТР
     вот так запрос в постмане прописывается
     http://localhost:3000/users?term=Pa*!/
    @Get()
    getUserWithQueryParams(@Query('term') term: string) {
      return [
        { id: 1, name: 'Pavel' },
        { id: 4, name: 'Alex' },
      ].filter((el) => el.name.indexOf(term) > -1);
    }*/

  /*ЭТО ГЕТ ЗАПРОС С КВЕРИ ПАРАМЕТРАМИ
МНОГО  ПАРАМЕТРов
 вот так запрос в постмане прописывается
 http://localhost:3000/users?term=Pa*/
  @Get()
  getUserWithQueryParams(@Query() query: { term: string }) {
    return [
      { id: 1, name: 'Pavel' },
      { id: 4, name: 'Alex' },
    ].filter((el) => el.name.indexOf(query.term) > -1);
  }

  /*
  @Post()
    /!* из тела запроса -ИЗ БОДИ ВОЗМУ ПРИХОДЯЩИЕ ДАННЫЕ
    @Body() inputModel---создать inputModel надо
    в постмане когда запрос отправляю*!/
    createUser(@Body() inputModel: CreateUserInputModelType) {
      return { id: 7, name: inputModel.name, age: inputModel.age };
    }*/

  @Post()
  /* из тела запроса -ИЗ БОДИ ВОЗМУ ПРИХОДЯЩИЕ ДАННЫЕ
  @Body() inputModel---имя тут  inputModel а
  в постмане когда запрос отправляю это обьект с
  данными*/
  async createUser(@Body() inputModel: CreateUserInputModelType) {
    const dto = {
      id: inputModel.id,
      name: inputModel.name,
      age: inputModel.age,
    };

    const res = await this.usersService.createUser(dto);
    return res;
  }

  /*  @Get(':id')--тут id это uriПАРaМЕТР он в урле и из
  постмана запрос таким будет http://localhost:3000/users/1*/
  @Get(':id')
  /* @Param('id') userId: string---обязательно декоратор добавить
 который определит что это значение из ПАРАМЕТРА а положить значение  из параметра я могу в любую переменную-как
  хочу так и называю
  МОЖНО ПАРАМЕТРЫ ПО ДРУГОМУ ПРОПИСАТЬ НО
   ТОГДА НАДО ЧТОБ НАЗВАНИЯ id СОВПАДАЛИ
     getUserById(@Param() params: { id: string }) {
  return [{ id: 1 }, { id: 4 }].find((e) => e.id === +params.id);*/
  getUserById(@Param('id') userId: string) {
    return this.usersService.findUserService(userId);
  }

  @Delete(':id')
  deleteUserById(@Param('id') userId: string) {
    return [
      { id: 1, name: 'Pavel' },
      { id: 2, name: 'Pav' },
      { id: 4, name: 'Alex' },
    ].filter((e) => e.id !== +userId);
  }

  /*  ///////////////////////////////////////////////////
    /!* ЭТО ВАРИАНТ КОГДА В ТЕЛЕ ЗАПРОСА И
     АЙДИШКА И ЗНАЧЕНИЕ КОТОРОЕ БУДУ МЕНЯТЬ*!/
    @Put()
    updateUser(@Body() inputModel: UpdateUserInputModelType) {
      const array = [
        { id: 1, name: 'Pavel' },
        { id: 2, name: 'Pav' },
        { id: 4, name: 'Alex' },
      ];
      const obj = array.find((e) => e.id === +inputModel.id);
      const res = { ...obj, name: inputModel.name };
      return res;
    }*/

  //////////////////////////////////////////////////////////

  /* ЭТО ВАРИАНТ КОГДА В ТЕЛЕ ЗАПРОСА
 ЗНАЧЕНИЕ КОТОРОЕ БУДУ МЕНЯТЬ    а айдишка в УРИ параметре */
  @Put(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() inputModel: { name: string },
  ) {
    const array = [
      { id: 1, name: 'Pavel' },
      { id: 2, name: 'Pav' },
      { id: 4, name: 'Alex' },
    ];
    const obj = array.find((e) => e.id === +userId);
    const res = { ...obj, name: inputModel.name };
    return res;
  }
}

export type CreateUserInputModelType = {
  id: number;
  name: string;
  age: number;
};

/*type UpdateUserInputModelType = {
  id: number;
  name: string;
};*/
