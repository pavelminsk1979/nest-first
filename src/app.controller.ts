import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
/* @Controller()является декоратором,
 который применяется к классу AppController. Он указывает,
 что этот класс является контроллером. Контроллеры в NestJS отвечают за
  обработку HTTP-запросов и определение маршрутов*/
export class AppController {
  /* Здесь используется механизм внедрения зависимостей.
    Когда экземпляр AppController создается, NestJS автоматически
   внедряет экземпляр AppService*/
  constructor(private readonly appService: AppService) {}

  @Get() /*@Get() является декоратором, который применяется
   к методу getHello(). Он указывает, что этот метод будет
   обрабатывать HTTP GET-запросы
   @Get()   в скобках пусто поэтому URL будет таким  "/"
    на фронтенд возвращается строка*/
  getHello(): string {
    return this.appService.getHello();
  }
}
