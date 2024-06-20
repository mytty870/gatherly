// export { default } from "next-auth/middleware"
import withAuth from 'next-auth/middleware'

// https://github.com/nextauthjs/next-auth/discussions/4414
// ↑こちらを参考に
export default withAuth({
  secret: process.env.AUTH_SECRET,
})

export const config = {
  matcher: ['/settings/account'],
}
