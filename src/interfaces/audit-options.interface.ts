export interface AuditOptions {
  entity: string;
  action?: 'create' | 'update' | 'delete';
  ignoreFields?: string[];
}
