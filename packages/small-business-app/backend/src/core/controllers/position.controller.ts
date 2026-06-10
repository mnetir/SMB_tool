import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PositionService } from '../services/position.service';
import { Position } from '../entities/position.entity';
import { PositionChart } from '../entities/position-chart.entity';
import { CreatePositionDto } from '../dto/create-position.dto';

@ApiTags('Core - Positions')
@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  @ApiOperation({ summary: 'List all positions' })
  async findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a position' })
  async create(@Body() dto: CreatePositionDto): Promise<Position> {
    return this.positionService.create(dto);
  }

  @Get('charts')
  @ApiOperation({ summary: 'List all position charts' })
  async findAllCharts(): Promise<PositionChart[]> {
    return this.positionService.findAllCharts();
  }

  @Post('charts')
  @ApiOperation({ summary: 'Create a position chart' })
  async createChart(@Body() data: Partial<PositionChart>): Promise<PositionChart> {
    return this.positionService.createChart(data);
  }
}