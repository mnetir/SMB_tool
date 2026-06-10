import { Module, Injectable, Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notification) private repo: Repository<Notification>) {}
  async send(dto: Partial<Notification>) { const e = this.repo.create(dto); return this.repo.save(e); }
  async findByUser(userId: string) { return this.repo.find({ where: { recipientUserId: userId }, order: { createdAtUtc: 'DESC' }, take: 50 }); }
  async markRead(id: string) { await this.repo.update(id, { isRead: true, readAt: new Date() }); }
}

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}
  @Post() @ApiOperation({ summary: 'Send notification' }) send(@Body() dto: any) { return this.service.send(dto); }
  @Get() @ApiOperation({ summary: 'Get notifications for user' }) findByUser(@Query('userId') userId: string) { return this.service.findByUser(userId); }
  @Patch(':id/read') @ApiOperation({ summary: 'Mark notification as read' }) markRead(@Param('id') id: string) { return this.service.markRead(id); }
}

@Module({ imports: [TypeOrmModule.forFeature([Notification])], controllers: [NotificationsController], providers: [NotificationsService], exports: [NotificationsService] })
export class NotificationsModule {}