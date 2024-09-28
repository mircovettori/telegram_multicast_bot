import { Body, Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('telegram')
export class TelegramController {

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('send_message')
  sendMessage() {
    return "result";
  }
}
