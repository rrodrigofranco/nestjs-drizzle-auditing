import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { AUDIT_METADATA_KEY } from './audit.decorator';
import { AuditService } from './audit.service';
import { AuditOptions } from './interfaces/audit-options.interface';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly auditService: AuditService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id || null;
    const handler = context.getHandler();

    const auditOptions: AuditOptions = this.reflector.get(
      AUDIT_METADATA_KEY,
      handler,
    );

    if (!auditOptions) return next.handle();

    const beforeData = { ...req.body };

    return next.handle().pipe(
      tap(async (result) => {
        await this.auditService.record({
          entity: auditOptions.entity,
          action: auditOptions.action || 'update',
          oldValue: beforeData,
          newValue: result,
          userId,
        });
      }),
    );
  }
}