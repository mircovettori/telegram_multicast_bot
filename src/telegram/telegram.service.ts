import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as https from 'https'
import { catchError, firstValueFrom } from 'rxjs';
import { ResponseDto } from 'src/auth/dto/response.dto';

@Injectable()
export class TelegramService {
    constructor(
        private httpService: HttpService,
    ) {}

    async sendMessageAndPhoto(text?: string, image?: Express.Multer.File): Promise<ResponseDto> {
        if(!text && !image)
            throw new InternalServerErrorException(
                <ResponseDto>{
                    result: "Error sending telegram message",
                    errors: ["you must provide either a text or a image"]
                }
            )
        if(text) {
          await firstValueFrom(this.sendMessage(text).pipe(
            catchError(e => {
                throw new InternalServerErrorException(
                    <ResponseDto>{
                        result: "Error sending telegram message",
                        errors: [`Cannot send text, telegram api sendMessage return code: ${e.response.status}`]
                    }
                )
            })
          )).then((res) => res.status)
        }
        if(image) {
            await firstValueFrom(this.sendPhoto(image).pipe(
              catchError(e => {
                  throw new InternalServerErrorException(
                      <ResponseDto>{
                          result: "Error sending telegram message",
                          errors: [`Cannot send photo, telegram api sendPhoto return code: ${e.response.status}`]
                      }
                  )
              })
            )).then((res) => res.status)
          }
        
        return <ResponseDto>{
            result: "Message successfully sent"
        }
    }

    private sendMessage(text: string) {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
          })
        return this.httpService.post("https://api.telegram.org/bot7309366684:AAECrqPwlEEUMJ59lr3apUce2trjiELrdaM/sendMessage", {chat_id: 408920441, text}, {httpsAgent});
    }

    private sendPhoto(image?: Express.Multer.File) {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
          })
        return this.httpService.post("https://api.telegram.org/bot7309366684:AAECrqPwlEEUMJ59lr3apUce2trjiELrdaM/sendPhoto", {chat_id: 408920441, photo: image.stream}, {httpsAgent})
    }
}
