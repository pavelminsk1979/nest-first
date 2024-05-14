import { Injectable } from '@nestjs/common';

@Injectable() /*ДЕКОРАТОР-Помечает класс как инъектируемый...
Этот класс может быть инъектирован в другие компоненты или 
классы (как зависимость) , это механизм внедрения зависимостей.*/
export class AppService {
  getHello(): string {
    return 'Hello World!"""';
  }
}
