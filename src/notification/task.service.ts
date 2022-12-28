import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval, Timeout } from "@nestjs/schedule";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron("45 * * * * *")
  handleCron() {
    this.logger.log("Called when the second is 45");
  }

  @Interval(10000)
  handleInterval() {
    this.logger.log("Called every 10 seconds");
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.log("Called once after 5 seconds");
  }
}
