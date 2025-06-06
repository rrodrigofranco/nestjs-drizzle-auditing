import { Module, Global, DynamicModule } from '@nestjs/common';
import { AuditInterceptor } from './audit.interceptor';
import { AuditService } from './audit.service';
import { AuditModuleOptions } from './interfaces/audit-module-options.interface';

@Global()
@Module({})
export class AuditModule {
  static forRootAsync(options: AuditModuleOptions): DynamicModule {
    return {
      module: AuditModule,
      providers: [
        {
          provide: 'AUDIT_SCHEMA',
          useValue: options.schema,
        },
        AuditService,
        AuditInterceptor,
      ],
      exports: [AuditService, AuditInterceptor],
    };
  }
}
