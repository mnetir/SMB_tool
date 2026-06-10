import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonnelProfile } from '../entities/personnel-profile.entity';
import { EmploymentInfo } from '../entities/employment-info.entity';
import { CreatePersonnelDto } from '../dto/create-personnel.dto';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(PersonnelProfile)
    private readonly profileRepository: Repository<PersonnelProfile>,
    @InjectRepository(EmploymentInfo)
    private readonly employmentInfoRepository: Repository<EmploymentInfo>,
  ) {}

  async findAll(): Promise<any[]> {
    const profiles = await this.profileRepository.find({ order: { createdAt: 'DESC' } });
    return profiles;
  }

  async findOne(id: string): Promise<PersonnelProfile> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) throw new NotFoundException(`Personnel profile ${id} not found`);
    return profile;
  }

  async findByUserId(userId: string): Promise<PersonnelProfile> {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) throw new NotFoundException(`Personnel for user ${userId} not found`);
    return profile;
  }

  async create(dto: CreatePersonnelDto): Promise<PersonnelProfile> {
    const profile = this.profileRepository.create({
      userId: dto.userId,
      personnelNumber: dto.personnelNumber,
      nationalCode: dto.nationalCode,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fatherName: dto.fatherName,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      gender: dto.gender,
      maritalStatus: dto.maritalStatus,
      email: dto.email,
      phone: dto.phone,
      mobile: dto.mobile,
      address: dto.address,
    });
    const saved = await this.profileRepository.save(profile);

    // Create employment info if hireDate provided
    if (dto.hireDate) {
      const empInfo = this.employmentInfoRepository.create({
        userId: dto.userId,
        hireDate: new Date(dto.hireDate),
        employmentCategoryId: dto.employmentCategoryId,
      });
      await this.employmentInfoRepository.save(empInfo);
    }

    return saved;
  }

  async getProfileWithDetails(userId: string): Promise<any> {
    const profile = await this.findByUserId(userId);
    const empInfo = await this.employmentInfoRepository.findOne({
      where: { userId },
    });
    return { profile, employmentInfo: empInfo };
  }
}