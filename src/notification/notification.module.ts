import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TaskService],
  controllers: [TasksController],
})
export class NotificationModule { }
