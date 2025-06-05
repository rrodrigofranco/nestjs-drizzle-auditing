import { Injectable, Inject } from '@nestjs/common';
import { auditLogs } from './drizzle/audit-log.schema';
import { AuditOptions } from './interfaces/audit-options.interface';
import { DrizzleClient } from 'drizzle-orm';

@Injectable()
export class AuditService {
  constructor(@Inject('DRIZZLE_CLIENT') private db: DrizzleClient) {}

  async record(options: {
    entity: string;
    action: string;
    oldValue?: any;
    newValue?: any;
    userId?: string;
  }) {
    await this.db.insert(auditLogs).values({
      entity: options.entity,
      action: options.action,
      oldValue: options.oldValue ?? null,
      newValue: options.newValue ?? null,
      userId: options.userId,
    });
  }
}