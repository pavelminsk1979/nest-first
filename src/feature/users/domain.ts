import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
/*описана типизация документа, полученный из базы данных
MongoDB с помощью Mongoose--ЭТО УМНЫЙ ОБЬЕКТ */
export type UserDocument = HydratedDocument<User>;

/*Декоратор @Schema() применяется к классу User.
  Он указывает, что класс User является схемой Mongoose.*/
@Schema()
export class User {
  /*  Декоратор @Prop() применяется к каждому свойству в классе User. Он указывает, что свойство должно быть учтено при создании схемы Mongoose.*/
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  id: string;
}

/*ТУТ В АРГУМЕНТ ПОМЕЩАЕТСЯ КЛАСС User  и в переменную
UserSchema  получаю СХЕМУ*/
export const UserSchema = SchemaFactory.createForClass(User);

/*
пример как если у документа имеется вложеный
докумени  и СОЗДАТЬ СХЕМУ ДЛЯ ВЛОЖЕНОГО
ДОКУМЕНТА
@Schema()
export class Post {
  @Prop()
  titlePost: string;

  @Prop()
  content: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);

@Schema()
export class Blog {
  @Prop()
  titleBlog: string;

  @Prop({
  default: [],

  ТУТ ОТПРЕДЕЛЕНИЕ ТИПА ИМЕННО ДЛЯ СХЕМЫ в
   процессе использования приложения
   ОБЯЗАТЕЛЬНО ИМЕННО ВОТ ТАК ЯВНО НАДО ПРОПИСАТЬ
   type:[PostSchema]})

   ТУТ ОПРЕДЕЛЕНИЕ ТИПА-как типизация на момент компиляции
  posts: Post[];

  export const UserSchema = SchemaFactory.createForClass(User);
}*/
