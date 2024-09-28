import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [AuthModule, UsersModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
