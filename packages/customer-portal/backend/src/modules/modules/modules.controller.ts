import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PortalModulesService } from './modules.service';

@ApiTags('Portal Modules')
@Controller('products/:productId/modules')
export class PortalModulesController {
  constructor(private readonly service: PortalModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create module under product' })
  create(@Param('productId') productId: string, @Body() dto: any) {
    return this.service.create({ ...dto, productId });
  }

  @Get()
  @ApiOperation({ summary: 'List modules for product' })
  findAll(@Param('productId') productId: string) {
    return this.service.findByProduct(productId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update module' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete module' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}