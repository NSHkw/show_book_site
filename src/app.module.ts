import { configModuleValidationSchema } from './configs/env-validation.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { ShowModule } from './show/show.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOPtions } from './configs/database.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BookModule,
    ShowModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOPtions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
