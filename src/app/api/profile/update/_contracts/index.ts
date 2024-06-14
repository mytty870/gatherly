import { createContract } from '@/lib/rpc'
import { z } from 'zod'

const ProfileSchema = z.object({
  id: z.string(),
  avatarUrl: z.string().nullable(),
  userName: z.string().nullable(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  zennUserName: z.string().nullable(),
  quiitaUserName: z.string().nullable(),
  noteUserName: z.string().nullable(),
  sizuUserName: z.string().nullable(),
  githubUserName: z.string().nullable(),
  twiterUserName: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export const post = createContract({
  method: 'POST',
  path: '/api/profile/update',
  input: z.object({
    displayName: z.string().optional(),
    bio: z.string().optional(),
    quiitaUserName: z.string().optional(),
    zennUserName: z.string().optional(),
    noteUserName: z.string().optional(),
  }),
  output: z.object({
    success: z.boolean(),
    profile: ProfileSchema,
  }),
})
