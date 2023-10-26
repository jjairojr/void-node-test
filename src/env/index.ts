import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3000),
  RIOT_API_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid enviroment variable');

  throw new Error('Invalid enviroment variable');
}

export const env = _env.data;
