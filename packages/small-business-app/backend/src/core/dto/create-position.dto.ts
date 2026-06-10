import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty()
  @IsUUID()
  positionChartId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentPositionId?: string;

  @ApiProperty()
  @IsString()
  positionCode: string;

  @ApiProperty()
  @IsString()
  positionTitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  organizationNodeId?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}