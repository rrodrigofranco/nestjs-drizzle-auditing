import { SetMetadata } from '@nestjs/common';
import { AuditOptions } from './interfaces/audit-options.interface';

export const AUDIT_METADATA_KEY = 'audit:options';

export const Auditable = (options: AuditOptions): MethodDecorator => {
  return SetMetadata(AUDIT_METADATA_KEY, options);
};