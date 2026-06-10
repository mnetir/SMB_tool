import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrgService } from '../services/org.service';
import { OrganizationChart } from '../entities/organization-chart.entity';
import { OrganizationNode } from '../entities/organization-node.entity';
import { CreateOrganizationNodeDto } from '../dto/create-org-node.dto';

@ApiTags('Core - Organization')
@Controller('org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get('charts')
  @ApiOperation({ summary: 'List all organization charts' })
  async findAllCharts(): Promise<OrganizationChart[]> {
    return this.orgService.findAllCharts();
  }

  @Post('charts')
  @ApiOperation({ summary: 'Create an organization chart' })
  async createChart(@Body() data: Partial<OrganizationChart>): Promise<OrganizationChart> {
    return this.orgService.createChart(data);
  }

  @Get('charts/:chartId/nodes')
  @ApiOperation({ summary: 'Get nodes by chart' })
  async findNodesByChart(@Param('chartId') chartId: string): Promise<OrganizationNode[]> {
    return this.orgService.findNodesByChart(chartId);
  }

  @Post('nodes')
  @ApiOperation({ summary: 'Add an organization node' })
  async createNode(@Body() dto: CreateOrganizationNodeDto): Promise<OrganizationNode> {
    return this.orgService.createNode(dto);
  }
}