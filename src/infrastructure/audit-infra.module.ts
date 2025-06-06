import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { AuditModule, AuditInterceptor } from '..';
import { auditLogs } from '../drizzle/audit-log.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuditModule.forRootAsync({
      schema: { auditLogs },
    }),
  ],
  providers: [
    {
      provide: 'DRIZZLE_CLIENT',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const pool = await mysql.createPool({
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          user: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
        });
        return drizzle(pool);
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  exports: [],
})
export class AuditInfrastructureModule {}
