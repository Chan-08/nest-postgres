// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'chan',
      database: 'my_nest_app',
      entities: [User],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
