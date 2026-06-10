import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import databaseConfig from './config/database.config';
import { HealthController } from './modules/health.controller';
import { AuditModule } from './modules/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { PortalModulesModule } from './modules/modules/modules.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionLimitsModule } from './modules/permission-limits/permission-limits.module';
import { SalesPlansModule } from './modules/sales-plans/sales-plans.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LicensesModule } from './modules/licenses/licenses.module';
import { ProvisioningModule } from './modules/provisioning/provisioning.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PortalUsersModule } from './modules/portal-users/portal-users.module';

@Module({
  controllers: [HealthController],
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [databaseConfig],
    }),

    // TypeORM Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host', 'localhost'),
        port: configService.get<number>('database.port', 5432),
        username: configService.get('database.username', 'postgres'),
        password: configService.get('database.password', 'postgres'),
        database: configService.get('database.database', 'pishgaman_portal'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize', false),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations',
        logging: configService.get<boolean>('database.logging', false),
        ssl: configService.get<boolean>('database.ssl', false)
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    // Scheduling
    ScheduleModule.forRoot(),

    // Feature Modules
    AuditModule,
    AuthModule,
    ProductsModule,
    PortalModulesModule,
    PermissionsModule,
    PermissionLimitsModule,
    SalesPlansModule,
    CustomersModule,
    SubscriptionsModule,
    InvoicesModule,
    PaymentsModule,
    LicensesModule,
    ProvisioningModule,
    NotificationsModule,
    PortalUsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware can be applied here
  }
}