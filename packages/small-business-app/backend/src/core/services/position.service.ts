import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '../entities/position.entity';
import { PositionChart } from '../entities/position-chart.entity';
import { CreatePositionDto } from '../dto/create-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(PositionChart)
    private readonly chartRepository: Repository<PositionChart>,
  ) {}

  async findAll(): Promise<Position[]> {
    return this.positionRepository.find({
      relations: ['chart'],
      order: { positionCode: 'ASC' },
    });
  }

  async create(dto: CreatePositionDto): Promise<Position> {
    const chart = await this.chartRepository.findOne({ where: { id: dto.positionChartId } });
    if (!chart) throw new NotFoundException(`PositionChart ${dto.positionChartId} not found`);
    const position = this.positionRepository.create(dto);
    return this.positionRepository.save(position);
  }

  async findAllCharts(): Promise<PositionChart[]> {
    return this.chartRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createChart(data: Partial<PositionChart>): Promise<PositionChart> {
    const chart = this.chartRepository.create(data);
    return this.chartRepository.save(chart);
  }
}