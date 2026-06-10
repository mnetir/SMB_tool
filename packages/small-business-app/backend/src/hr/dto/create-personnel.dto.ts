import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePersonnelDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsString()
  personnelNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nationalCode?: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  hireDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  employmentCategoryId?: string;
}

export class CreateContractDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsString()
  contractNumber: string;

  @ApiProperty()
  @IsString()
  contractType: string;

  @ApiProperty()
  startDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ default: 'Draft' })
  @IsOptional()
  @IsString()
  contractStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  workLocationType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  workOrganizationNodeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentCycle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  projectId?: string;
}

export class CreateAmendmentDto {
  @ApiProperty()
  @IsUUID()
  employmentContractId: string;

  @ApiProperty()
  @IsString()
  amendmentNumber: string;

  @ApiProperty()
  @IsString()
  amendmentType: string;

  @ApiProperty()
  effectiveDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}