import { Module, DynamicModule, Global } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditInterceptor } from './audit.interceptor';

@Global()
@Module({})
export class AuditModule {
  static forRootAsync(options: {
      imports?: any[];
      inject?: any[];
      useFactory: (...args: any[]) => Promise<{ schema: any; drizzleClient: any }> | { schema: any; drizzleClient: any };
    }): DynamicModule {
      return {
        module: AuditModule,
        imports: options.imports || [],
        providers: [
          {
            provide: 'AUDIT_SCHEMA',
            useFactory: async (...args: any[]) => (await options.useFactory(...args)).schema,
            inject: options.inject || [],
          },
          {
            provide: 'DRIZZLE_CLIENT',
            useFactory: async (...args: any[]) => (await options.useFactory(...args)).drizzleClient,
            inject: options.inject || [],
          },
          AuditService,
          AuditInterceptor,
        ],
        exports: [AuditService, AuditInterceptor],
      };
    }
}
