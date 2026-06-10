import { Module, Injectable, Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class AuditService {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}
  async log(entry: Partial<AuditLog>) { const e = this.repo.create(entry); return this.repo.save(e); }
  async query(params: { actorId?: string; subjectId?: string; from?: Date; to?: Date; page?: number; limit?: number }) {
    const qb = this.repo.createQueryBuilder('a');
    if (params.actorId) qb.andWhere('a.actorUserId = :actorId', { actorId: params.actorId });
    if (params.subjectId) qb.andWhere('a.entityId = :subjectId', { subjectId: params.subjectId });
    if (params.from) qb.andWhere('a.createdAtUtc >= :from', { from: params.from });
    if (params.to) qb.andWhere('a.createdAtUtc <= :to', { to: params.to });
    const page = params.page || 1;
    const limit = params.limit || 50;
    const [items, total] = await qb.orderBy('a.createdAtUtc', 'DESC').skip((page-1)*limit).take(limit).getManyAndCount();
    return { items, total, page, limit };
  }
}

@ApiTags('Audit Logs')
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly service: AuditService) {}
  @Get() @ApiOperation({ summary: 'Query audit logs' }) query(@Query() params: any) { return this.service.query(params); }
  @Post() @ApiOperation({ summary: 'Create audit log entry' }) log(@Body() dto: any) { return this.service.log(dto); }
}

@Module({ imports: [TypeOrmModule.forFeature([AuditLog])], controllers: [AuditController], providers: [AuditService], exports: [AuditService] })
export class AuditModule {}