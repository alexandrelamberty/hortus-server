import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/common/middleware/logger.middleware';
import { User } from 'src/users/schemas/user.schema';


@Injectable()
export class MailService {
constructor(
	private mailerService: MailerService,
	private configService : ConfigService
  ) {}

  private readonly logger = new Logger(MailService.name);
  private readonly confirmUrl : string = this.configService.get('mail.confirmation')

  async sendUserConfirmation(user: User, token: string) {
    const url = this.confirmUrl + '?token=${token}';

    return await this.mailerService.sendMail({
      to: user.email, 
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', 
      context: { 
        name: user.username,
        url,
      },
    });
  }

  async sendUserInvitation(user:User, token: string ) {
    const url = this.confirmUrl + '?token=${token}';

    return await this.mailerService.sendMail({
      to: user.email, 
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'invitation',
      context: { 
        name: user.username,
        url,
      },
    });
  }

}
