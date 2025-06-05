# nestjs-drizzle-auditing

**Automated auditing for NestJS using Drizzle ORM.**  
Inspired by [laravel-auditing](https://github.com/owen-it/laravel-auditing).

## 📦 Installation

```bash
npm install nestjs-drizzle-auditing
# or
yarn add nestjs-drizzle-auditing
```

## 🔧 Setup

### 1. Import the module

```ts
import { AuditModule } from 'nestjs-drizzle-auditing';

@Module({
  imports: [AuditModule],
})
export class AppModule {}
```

### 2. Register your Drizzle client

When initializing the module, you must provide your `DrizzleClient` using a custom provider:

```ts
{
  provide: 'DRIZZLE_CLIENT',
  useValue: drizzleInstance, // your configured Drizzle ORM client
}
```

### 3. Add the AuditInterceptor globally or per controller

```ts
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from 'nestjs-drizzle-auditing';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
```

## 🏷 Usage

### Decorate a service method:

```ts
import { Auditable } from 'nestjs-drizzle-auditing';

@Injectable()
export class UsersService {
  @Auditable({ entity: 'User', action: 'update' })
  async updateUser(id: string, dto: UpdateUserDto) {
    // your update logic here
  }
}
```

> By default, the `action` is set to `'update'` if omitted.

## 🗃 Schema: Audit Log Table

You can create a table like the following in your Drizzle schema:

```ts
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  entity: text('entity').notNull(),
  action: text('action').notNull(), // create, update, delete
  oldValue: jsonb('old_value'),
  newValue: jsonb('new_value'),
  userId: text('user_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
```

## 📌 Example Inserted Log

```json
{
  "entity": "User",
  "action": "update",
  "old_value": {
    "name": "John Bonham"
  },
  "new_value": {
    "name": "Pat Phillips"
  },
  "user_id": "12345",
  "created_at": "2025-06-05T18:30:00.000Z"
}
```

## 🔍 Roadmap

- [ ] Support for ignoring specific fields (`ignoreFields`)
- [ ] Async logging via queues (BullMQ or RabbitMQ)
- [ ] Deep diff support for complex objects
- [ ] Decorator for class-level auditing

## 📄 License

MIT © [Rodrigo Franco]