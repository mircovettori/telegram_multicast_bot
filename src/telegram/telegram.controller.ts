import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { TelegramService } from './telegram.service';
import { ResponseDto } from 'src/auth/dto/response.dto';

@Controller('telegram')
export class TelegramController {
    constructor(private telegramService: TelegramService) {}

//   @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('send_message')
  @UseInterceptors(FileInterceptor('image'))
  sendMessage(@Body() body: {text?: string}, @UploadedFile() image?: Express.Multer.File): Promise<ResponseDto> {
    return this.telegramService.sendMessageAndPhoto(body.text, image);
  }
}
