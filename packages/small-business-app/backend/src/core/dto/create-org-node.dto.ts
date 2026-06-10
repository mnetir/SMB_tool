import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizationNodeDto {
  @ApiProperty()
  @IsUUID()
  organizationChartId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentOrganizationNodeId?: string;

  @ApiProperty()
  @IsString()
  nodeType: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  projectCode: string;

  @ApiProperty()
  @IsString()
  projectTitle: string;

  @ApiPropertyOptional({ default: 'Active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerOrClientName?: string;
}