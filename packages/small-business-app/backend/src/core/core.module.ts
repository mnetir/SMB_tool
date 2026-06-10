import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { OrgController } from './controllers/org.controller';
import { ProjectController } from './controllers/project.controller';
import { PositionController } from './controllers/position.controller';
import { UserService } from './services/user.service';
import { OrgService } from './services/org.service';
import { ProjectService } from './services/project.service';
import { PositionService } from './services/position.service';

// Core entities
import { CompanyProfile } from './entities/company-profile.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { UserPermissionOverride } from './entities/user-permission-override.entity';
import { OrganizationChart } from './entities/organization-chart.entity';
import { OrganizationNode } from './entities/organization-node.entity';
import { Branch } from './entities/branch.entity';
import { PositionChart } from './entities/position-chart.entity';
import { Position } from './entities/position.entity';
import { UserOrganizationAssignment } from './entities/user-organization-assignment.entity';
import { UserPositionAssignment } from './entities/user-position-assignment.entity';
import { Project } from './entities/project.entity';
import { ProjectAssignment } from './entities/project-assignment.entity';
import { Attachment } from './entities/attachment.entity';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { AuditLog } from './entities/audit-log.entity';
import { Setting } from './entities/setting.entity';
import { NumberingSequence } from './entities/numbering-sequence.entity';
import { LicenseEntitlementSnapshot } from './entities/license-entitlement-snapshot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyProfile, User, Role, Permission, UserRole, UserPermissionOverride,
      OrganizationChart, OrganizationNode, Branch,
      PositionChart, Position,
      UserOrganizationAssignment, UserPositionAssignment,
      Project, ProjectAssignment,
      Attachment, Notification, NotificationPreference,
      AuditLog, Setting, NumberingSequence, LicenseEntitlementSnapshot,
    ]),
  ],
  controllers: [UserController, OrgController, ProjectController, PositionController],
  providers: [UserService, OrgService, ProjectService, PositionService],
  exports: [UserService, OrgService, ProjectService, PositionService],
})
export class CoreModule {}