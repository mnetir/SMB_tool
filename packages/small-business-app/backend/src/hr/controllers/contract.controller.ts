import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContractService } from '../services/contract.service';
import { CreateContractDto, CreateAmendmentDto } from '../dto/create-personnel.dto';

@ApiTags('HR - Contracts')
@Controller('hr/contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  @ApiOperation({ summary: 'List all contracts' })
  async findAll() {
    return this.contractService.findAll();
  }

  @Get('by-user/:userId')
  @ApiOperation({ summary: 'Get contracts by user' })
  async findByUser(@Param('userId') userId: string) {
    return this.contractService.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new contract' })
  async create(@Body() dto: CreateContractDto) {
    return this.contractService.create(dto);
  }

  @Post(':id/amend')
  @ApiOperation({ summary: 'Create contract amendment' })
  async amend(@Param('id') id: string, @Body() dto: CreateAmendmentDto) {
    return this.contractService.createAmendment({ ...dto, employmentContractId: id });
  }

  @Post(':id/renew')
  @ApiOperation({ summary: 'Process contract renewal' })
  async renew(
    @Param('id') id: string,
    @Body() body: { method: 'NewContract' | 'Amendment'; newContract?: CreateContractDto; amendment?: CreateAmendmentDto },
  ) {
    return this.contractService.renewContract(id, body.method, body.newContract, body.amendment);
  }
}