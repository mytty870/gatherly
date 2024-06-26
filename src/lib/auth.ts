import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'
import { customPrismaAdapter } from './customPrismaAdapter'
import { getServerSession as originalGetServerSession } from 'next-auth'
import { cache } from 'react'

export const authOptions: NextAuthOptions = {
  // プロフィール画像を User モデルではなく Profile モデルに保存するためにカスタマイズした customPrismaAdapter を使用
  adapter: customPrismaAdapter,
  secret: process.env.NEXTAUTH,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          // 毎回ユーザーに権限付与の確認を要求する
          prompt: 'consent',
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
        include: { profile: true },
      })
      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }
      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.profile?.avatarUrl,
        userName: dbUser.profile?.userName,
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image as string
        session.user.userName = token.userName as string
      }
      return session
    },
  },
}

export const getServerSession = cache(async () => {
  return originalGetServerSession(authOptions)
})
