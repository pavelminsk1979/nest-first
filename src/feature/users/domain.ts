import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
/*представляет документ, полученный из базы данных
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
