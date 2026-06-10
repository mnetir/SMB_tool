import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationChart } from '../entities/organization-chart.entity';
import { OrganizationNode } from '../entities/organization-node.entity';
import { CreateOrganizationNodeDto } from '../dto/create-org-node.dto';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(OrganizationChart)
    private readonly chartRepository: Repository<OrganizationChart>,
    @InjectRepository(OrganizationNode)
    private readonly nodeRepository: Repository<OrganizationNode>,
  ) {}

  async findAllCharts(): Promise<OrganizationChart[]> {
    return this.chartRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createChart(data: Partial<OrganizationChart>): Promise<OrganizationChart> {
    const chart = this.chartRepository.create(data);
    return this.chartRepository.save(chart);
  }

  async findNodesByChart(chartId: string): Promise<OrganizationNode[]> {
    return this.nodeRepository.find({
      where: { organizationChartId: chartId },
      order: { sortOrder: 'ASC' },
    });
  }

  async createNode(dto: CreateOrganizationNodeDto): Promise<OrganizationNode> {
    const node = this.nodeRepository.create(dto);
    return this.nodeRepository.save(node);
  }

  async deleteNode(id: string): Promise<void> {
    const node = await this.nodeRepository.findOne({ where: { id } });
    if (!node) throw new NotFoundException(`Node ${id} not found`);
    await this.nodeRepository.remove(node);
  }
}