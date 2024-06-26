'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu/DropdownMenu'
import { Profile } from '@/types'
import { Avatar } from '@/components/ui/avatar/Avatar'
import { Text } from '@/components/ui/text/Text'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

type UserDropdownMenuProps = {
  avatarUrl: Profile['avatarUrl']
  userName: Profile['userName']
  displayName: Profile['displayName']
}

export function UserDropdownMenu({
  avatarUrl,
  userName,
  displayName,
}: UserDropdownMenuProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer sm:size-12">
          <Image
            src={avatarUrl ?? ''}
            alt="Avatar Icon"
            width={500}
            height={500}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={e => e.preventDefault()}
        className="w-56"
      >
        <DropdownMenuLabel>
          <Text fontWeight="semibold" size="md">
            {displayName}
          </Text>
          <Text variantColor="slateGray" size="sm">
            @{userName}
          </Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${userName}`}>
            <DropdownMenuItem>マイページ</DropdownMenuItem>
          </Link>
          <Link href="/settings/account">
            <DropdownMenuItem>アカウント設定</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
