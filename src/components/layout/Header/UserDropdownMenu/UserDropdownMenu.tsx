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
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar/Avatar'
import { Text } from '@/components/ui/text/Text'
import Link from 'next/link'

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer rounded-full border">
          <AvatarImage src={avatarUrl} alt="Avatar" />
          <AvatarFallback>U</AvatarFallback>
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
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}