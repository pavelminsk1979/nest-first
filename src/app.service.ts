import { Injectable } from '@nestjs/common';

@Injectable() /*ДЕКОРАТОР-Помечает класс как инъектируемый...
Этот класс может быть инъектирован в другие компоненты или 
классы (как зависимость) , это механизм внедрения зависимостей
////////////////////////////
 все сервисы приложения должны быть  добавлены 
 в файл  app.module
providers: [AppService]*/
export class AppService {
  getHello(): string {
    return 'Hello World!"""';
  }
}
