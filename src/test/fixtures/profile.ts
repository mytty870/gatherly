import { Profile } from '@/types'

export const profileFixture: Profile = {
  id: '1',
  avatarUrl:
    'https://storage.googleapis.com/zenn-user-upload/avatar/5d4555fc05.jpeg',
  userName: 'johndoe',
  displayName: 'John Doe',
  bio: 'Bio text',
  zennUserName: 'johndoe_zenn',
  quiitaUserName: 'johndoe_qiita',
  noteUserName: 'johndoe_note',
  sizuUserName: 'johndoe_sizu',
  githubUserName: 'johndoe_github',
  twiterUserName: 'johndoe_twitter',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user1',
}
