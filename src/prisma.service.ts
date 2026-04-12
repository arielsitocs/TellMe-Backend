// ARCHIVO DONDE SE CREA LA CONEXION A LA BD PARA REALIZAR LAS CONSULTAS A ESTA, SE PUEDE REUTILIZAR EN CUALQUIER PARTE //
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL no esta definida. Verifica tu archivo .env');
    }

    const pool = new Pool({
      connectionString,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}