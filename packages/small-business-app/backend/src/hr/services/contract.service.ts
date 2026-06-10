import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmploymentContract } from '../entities/employment-contract.entity';
import { ContractAmendment } from '../entities/contract-amendment.entity';
import { ContractRenewalRecord } from '../entities/contract-renewal-record.entity';
import { CreateContractDto, CreateAmendmentDto } from '../dto/create-personnel.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(EmploymentContract)
    private readonly contractRepository: Repository<EmploymentContract>,
    @InjectRepository(ContractAmendment)
    private readonly amendmentRepository: Repository<ContractAmendment>,
    @InjectRepository(ContractRenewalRecord)
    private readonly renewalRepository: Repository<ContractRenewalRecord>,
  ) {}

  async findAll(): Promise<EmploymentContract[]> {
    return this.contractRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByUser(userId: string): Promise<EmploymentContract[]> {
    return this.contractRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<EmploymentContract> {
    const contract = await this.contractRepository.findOne({ where: { id } });
    if (!contract) throw new NotFoundException(`Contract ${id} not found`);
    return contract;
  }

  async create(dto: CreateContractDto): Promise<EmploymentContract> {
    // Validate: user should have at most one active contract
    const activeContracts = await this.contractRepository.find({
      where: { userId: dto.userId, contractStatus: 'Active' },
    });
    if (activeContracts.length > 0) {
      throw new BadRequestException('User already has an active contract');
    }

    const contract = this.contractRepository.create({
      userId: dto.userId,
      contractNumber: dto.contractNumber,
      contractType: dto.contractType,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      contractStatus: dto.contractStatus || 'Draft',
      workLocationType: dto.workLocationType,
      workOrganizationNodeId: dto.workOrganizationNodeId,
      paymentCycle: dto.paymentCycle || 'Monthly',
      projectId: dto.projectId,
    });

    // Validate ProjectBased contracts require ProjectId
    if (dto.contractType === 'ProjectBased' && !dto.projectId) {
      throw new BadRequestException('ProjectBased contracts require a ProjectId');
    }

    return this.contractRepository.save(contract);
  }

  async createAmendment(dto: CreateAmendmentDto): Promise<ContractAmendment> {
    const contract = await this.findOne(dto.employmentContractId);

    // Snapshot previous value
    const previousValue = {
      contractStatus: contract.contractStatus,
    };

    const amendment = this.amendmentRepository.create({
      employmentContractId: dto.employmentContractId,
      amendmentNumber: dto.amendmentNumber,
      amendmentType: dto.amendmentType,
      effectiveDate: new Date(dto.effectiveDate),
      description: dto.description,
      previousValueJson: previousValue,
    });
    return this.amendmentRepository.save(amendment);
  }

  async renewContract(
    contractId: string,
    method: 'NewContract' | 'Amendment',
    newContractDto?: CreateContractDto,
    amendmentDto?: CreateAmendmentDto,
  ): Promise<ContractRenewalRecord> {
    const previousContract = await this.findOne(contractId);

    // Mark previous contract as Expired
    previousContract.contractStatus = 'Expired';
    await this.contractRepository.save(previousContract);

    let newContractId: string | null = null;
    let amendmentId: string | null = null;

    if (method === 'NewContract' && newContractDto) {
      const newContract = await this.create(newContractDto);
      newContractId = newContract.id;
    } else if (method === 'Amendment' && amendmentDto) {
      const amendment = await this.createAmendment(amendmentDto);
      amendmentId = amendment.id;
    } else {
      throw new BadRequestException('Invalid renewal parameters');
    }

    const record = this.renewalRepository.create({
      userId: previousContract.userId,
      previousContractId: contractId,
      newContractId,
      amendmentId,
      renewalMethod: method,
      renewalDate: new Date(),
      effectiveStartDate: new Date(),
      reason: 'Contract renewal',
    } as any);
    return this.renewalRepository.save(record);
  }
}