export type AuditEvent = 'created' | 'updated' | 'deleted';

export interface AuditLogEntry {
  tableName: string;
  recordId: string;
  event: AuditEvent;
  oldValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
  userId: string | null;
  createdAt?: Date;
}