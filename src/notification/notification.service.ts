import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class NotificationService {
  @Cron("* * 0 * * *", {
    name: "notifications",
    timeZone: "Europe/Paris",
  })
  triggerNotifications() {
    // TODO: to be implemented
  }
}
