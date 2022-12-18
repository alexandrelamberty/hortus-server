import { Controller, Get } from "@nestjs/common";
import { MailService } from "./mail.service";

// FIXME: Don't need a controller this could be only internal?!
@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get("confirmation")
  sendUserConfirmation() {
    // return this.mailService.sendUserConfirmation()
  }

  @Get("invitation")
  sendUserInvitation() {
    // return this.mailService.sendUserInvitation()
  }
}
