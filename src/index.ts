export * from './audit.module';
export * from './audit.decorator';
export * from './audit.service';
export * from './audit.interceptor';

// src/interfaces/audit-options.interface.ts
export interface AuditOptions {
  entity: string;
  action?: 'create' | 'update' | 'delete';
  ignoreFields?: string[];
}