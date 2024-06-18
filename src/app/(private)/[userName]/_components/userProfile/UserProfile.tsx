import React from 'react'
import { Avatar } from '@/components/ui/avatar/Avatar'
import { Text } from '@/components/ui/text/Text'
import { Heading } from '@/components/ui/heading/Heading'
import { Profile } from '@/types'
import Image from 'next/image'
import { Card } from '@/components/ui/card/Card'

type UserProfileProps = {
  avatarUrl: Profile['avatarUrl']
  bio: Profile['bio']
  displayName: Profile['displayName']
}

export const UserProfile = ({
  avatarUrl,
  bio,
  displayName,
}: UserProfileProps) => {
  return (
    <Card className="min-h-[160px] w-[88vw] max-w-[400px] gap-3 md:w-[692px] md:max-w-[832px] lg:w-[832px]">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <Image
            src={avatarUrl ?? ''}
            alt="Avatar Icon"
            width={500}
            height={500}
          />
        </Avatar>
        <Heading level={2} size="ml" fontWeight="normal" align="left">
          {displayName}
        </Heading>
      </div>
      <div>
        <Text variantColor="charcoalGray" size="md">
          {bio ? bio : '自己紹介文が入力されていません'}
        </Text>
      </div>
    </Card>
  )
}
