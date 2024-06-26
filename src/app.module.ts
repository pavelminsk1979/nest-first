import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './feature/users/users.controller';
import { UsersService } from './feature/users/users.service';
import { UsersRepository } from './feature/users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './feature/users/domain';

/*декоратора @Module()---ЭТО КАК В ЭКСПРЕС КОМПОЗИШЕН-РУУТ..
в NestJS используются для организации
компонентов, контроллеров и сервисов в единое логическое целое.
  ---imports: Это массив других модулей, которые должны
быть импортированы в текущий модуль.Здесь вы можете указать модули,
которые предоставляют функциональность, необходимую для работы
компонентов и сервисов текущего модуля
  ---controllers: Это массив контроллеров, которые находятся
   в этом модуле. Контроллеры в NestJS отвечают за
   обработку HTTP-запросов и определение маршрутов.
    ---- providers: Это массив провайдеров, которые будут
     доступны в этом модуле. Провайдеры в NestJS отвечают
      за создание экземпляров сервисов и предоставление
      их внедрению зависимостей.   */
@Module({
  imports: [
    /*  тут подключение к удаленной базе данных ...url aдрес
      этой базы а в конце название конкретного отдела(projectNest)*/
    MongooseModule.forRoot(
      'mongodb+srv://pavvelpotapov:PV2PsPiYpmxxdhn9@cluster0.8s1u6fi.mongodb.net/projectNest',
    ),
    /*    --User.name  у класса(не у экземпляра класса) берут имя оно будет 'user'*/
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  /*все контроллеры приложения должны тут добавлены */
  controllers: [AppController, UsersController],
  /* все сервисы приложения должны тут добавлены */
  providers: [AppService, UsersService, UsersRepository],
})
/*export class AppModule {} в данном контексте
представляет сам модуль. То что собрано -сконфигурировано
выше--это и есть МОДУЛЬ и это как часть чегото, и часть
эту можно как npm-пакет кудато вставить-добавить*/
export class AppModule {}
