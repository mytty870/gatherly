export interface Profile {
  id: string
  avatarUrl: string
  userName: string
  displayName: string
  bio: string | null
  zennUserName: string | null
  quiitaUserName: string | null
  noteUserName: string | null
  sizuUserName: string | null
  githubUserName: string | null
  twiterUserName: string | null
  createdAt: Date
  updatedAt: Date
  userId: string
}
