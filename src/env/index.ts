import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3000),
  RIOT_API_KEY: z.string(),
  APP_URL: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_PASS: z.string(),
  DB_USER: z.string(),
});

const _env = envSchema.safeParse(process.env);

console.log(_env);

if (!_env.success) {
  console.error('❌ Invalid enviroment variable');

  throw new Error('Invalid enviroment variable');
}

console.log(_env.data);

export const env = _env.data;
