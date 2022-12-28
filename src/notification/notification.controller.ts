import { Controller, Get } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notifications")
//@UseInterceptors(CacheInterceptor)
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  getAll() {
    return "Notifications";
  }
}
