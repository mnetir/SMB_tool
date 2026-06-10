import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalModulesController } from './modules.controller';
import { PortalModulesService } from './modules.service';
import { Module as ModuleEntity } from './entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [PortalModulesController],
  providers: [PortalModulesService],
  exports: [PortalModulesService],
})
export class PortalModulesModule {}