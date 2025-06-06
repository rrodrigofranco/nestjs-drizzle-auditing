import {
  mysqlTable,
  serial,
  varchar,
  json,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const auditLogs = mysqlTable('audit_logs', {
  id: serial('id').primaryKey(),
  entity: varchar('entity', { length: 100 }).notNull(),
  action: varchar('action', { length: 50 }).notNull(),
  oldValue: json('old_value'),
  newValue: json('new_value'),
  userId: varchar('user_id', { length: 64 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});