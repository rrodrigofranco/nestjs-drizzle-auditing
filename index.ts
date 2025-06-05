export * from './src/audit.module';
export * from './src/audit.decorator';
export * from './src/audit.service';
export * from './src/audit.interceptor';

// src/interfaces/audit-options.interface.ts
export interface AuditOptions {
  entity: string;
  action?: 'create' | 'update' | 'delete';
  ignoreFields?: string[];
}