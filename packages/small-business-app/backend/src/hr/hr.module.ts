import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './controllers/personnel.controller';
import { ContractController } from './controllers/contract.controller';
import { PersonnelService } from './services/personnel.service';
import { ContractService } from './services/contract.service';

// HR entities
import { PersonnelProfile } from './entities/personnel-profile.entity';
import { EmploymentInfo } from './entities/employment-info.entity';
import { EmploymentCategory } from './entities/employment-category.entity';
import { JobGrade } from './entities/job-grade.entity';
import { InsuranceProfile } from './entities/insurance-profile.entity';
import { PersonnelStatusHistory } from './entities/personnel-status-history.entity';
import { UserManagerAssignment } from './entities/user-manager-assignment.entity';
import { Dependent } from './entities/dependent.entity';
import { EducationRecord } from './entities/education-record.entity';
import { SkillRecord } from './entities/skill-record.entity';
import { CertificationRecord } from './entities/certification-record.entity';
import { PersonnelDocument } from './entities/personnel-document.entity';
import { MedicalProfile } from './entities/medical-profile.entity';
import { EmploymentContract } from './entities/employment-contract.entity';
import { ContractAmendment } from './entities/contract-amendment.entity';
import { ContractCompensationItem } from './entities/contract-compensation-item.entity';
import { ContractAmendmentCompensationOverride } from './entities/contract-amendment-comp-override.entity';
import { ContractRenewalRecord } from './entities/contract-renewal-record.entity';
import { ContractAttachment } from './entities/contract-attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonnelProfile, EmploymentInfo, EmploymentCategory, JobGrade,
      InsuranceProfile, PersonnelStatusHistory, UserManagerAssignment,
      Dependent, EducationRecord, SkillRecord, CertificationRecord,
      PersonnelDocument, MedicalProfile,
      EmploymentContract, ContractAmendment, ContractCompensationItem,
      ContractAmendmentCompensationOverride, ContractRenewalRecord, ContractAttachment,
    ]),
  ],
  controllers: [PersonnelController, ContractController],
  providers: [PersonnelService, ContractService],
  exports: [PersonnelService, ContractService],
})
export class HrModule {}