import { Injectable, Inject } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';

type DrizzleClient = ReturnType<typeof drizzle>;

@Injectable()
export class AuditService {
  constructor(
    @Inject('DRIZZLE_CLIENT') private db: DrizzleClient,
    @Inject('AUDIT_SCHEMA') private schema: { auditLogs: any },
  ) {}

  async record(options: {
    entity: string;
    action: string;
    oldValue?: any;
    newValue?: any;
    userId?: string;
  }) {
    await this.db.insert(this.schema.auditLogs).values({
      entity: options.entity,
      action: options.action,
      oldValue: options.oldValue ?? null,
      newValue: options.newValue ?? null,
      userId: options.userId ?? null,
    });
  }
}
