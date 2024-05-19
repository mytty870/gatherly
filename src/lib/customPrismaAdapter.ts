import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Adapter, AdapterUser } from 'next-auth/adapters'
import { prisma } from './prisma'

export const customPrismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: async data => {
    const { image, ...userData } = data

    const user = await prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: {
            avatarUrl: image,
          },
        },
      },
      include: { profile: true },
    })
    return user as AdapterUser
  },
}
