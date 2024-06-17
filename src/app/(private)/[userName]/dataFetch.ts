import { cache } from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const getProfileFromScreenName = cache(async (userName: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userName: userName },
  })

  if (!profile) {
    notFound()
  }
  return profile
})
