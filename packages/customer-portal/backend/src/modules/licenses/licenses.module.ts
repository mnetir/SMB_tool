import { Module, Injectable, Controller, Get, Post, Body, Param, NotFoundException, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class LicensesService {
  private readonly logger = new Logger(LicensesService.name);
  constructor(@InjectRepository(License) private repo: Repository<License>) {}

  async generate(subscriptionId: string, payload: { permissions: any; limits: any; expiresAt?: Date }) {
    let license = await this.repo.findOne({ where: { subscriptionId } });
    if (!license) {
      license = this.repo.create({ subscriptionId, customerId: '', grantedPermissions: {}, grantedLimits: {}, licenseKey: '' });
    }
    license.grantedPermissions = payload.permissions;
    license.grantedLimits = payload.limits;
    license.expiresAt = payload.expiresAt;
    license.licenseKey = `LCS-${subscriptionId.substring(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    license.lastPushedAt = new Date();
    return this.repo.save(license);
  }

  async findBySubscription(subscriptionId: string) {
    return this.repo.findOne({ where: { subscriptionId } });
  }

  async findById(id: string) {
    const e = await this.repo.findOne({ where: { id }, relations: ['subscription'] });
    if (!e) throw new NotFoundException(`License ${id} not found`);
    return e;
  }
}

@ApiTags('Licenses')
@Controller('subscriptions/:subscriptionId/license')
export class LicensesController {
  constructor(private readonly service: LicensesService) {}
  @Post('generate') @ApiOperation({ summary: 'Generate license for subscription' }) generate(@Param('subscriptionId') subId: string, @Body() dto: any) { return this.service.generate(subId, dto); }
  @Get() @ApiOperation({ summary: 'Get license for subscription' }) findBySubscription(@Param('subscriptionId') subId: string) { return this.service.findBySubscription(subId); }
}

@Module({ imports: [TypeOrmModule.forFeature([License])], controllers: [LicensesController], providers: [LicensesService], exports: [LicensesService] })
export class LicensesModule {}