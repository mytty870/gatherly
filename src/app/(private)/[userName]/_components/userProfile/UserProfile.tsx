import React from 'react'
import { Avatar } from '@/components/ui/avatar/Avatar'
import { Text } from '@/components/ui/text/Text'
import { Heading } from '@/components/ui/heading/Heading'
import { Profile } from '@/types'
import Image from 'next/image'

type UserProfileProps = {
  profile: Profile
}

export const UserProfile = ({ profile }: UserProfileProps) => {
  return (
    <div className="flex min-h-[160px] w-[80vw] max-w-[900px] flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <Image
            src={profile.avatarUrl}
            alt="Avatar Icon"
            width={500}
            height={500}
          />
        </Avatar>
        <Heading level={2} size="ml" fontWeight="normal" align="left">
          {profile.displayName}
        </Heading>
      </div>
      <div>
        <Text variantColor="charcoalGray" size="md">
          {profile.bio ? profile.bio : '自己紹介文が入力されていません'}
        </Text>
      </div>
    </div>
  )
}
