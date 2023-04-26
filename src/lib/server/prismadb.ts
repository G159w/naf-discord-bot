import { PrismaClient } from "@prisma/client"
import { NODE_ENV } from '$env/static/private';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()
if (NODE_ENV !== "production") globalThis.prisma = prisma

export default prisma