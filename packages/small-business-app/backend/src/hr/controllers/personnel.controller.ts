import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PersonnelService } from '../services/personnel.service';
import { CreatePersonnelDto } from '../dto/create-personnel.dto';

@ApiTags('HR - Personnel')
@Controller('hr/personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Get()
  @ApiOperation({ summary: 'List all personnel' })
  async findAll() {
    return this.personnelService.findAll();
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Get personnel profile detail' })
  async getProfile(@Param('id') id: string) {
    return this.personnelService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create personnel' })
  async create(@Body() dto: CreatePersonnelDto) {
    return this.personnelService.create(dto);
  }
}