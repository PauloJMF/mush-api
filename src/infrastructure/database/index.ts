import { PrismaClient } from '@prisma/client'

interface Database {
    connect(): Promise<void>;
    getInstance(): PrismaClient | any;
}
export { Database }
