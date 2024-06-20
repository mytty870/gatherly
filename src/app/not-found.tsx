import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { Text } from '@/components/ui/text/Text'
import { Heading } from '@/components/ui/heading/Heading'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <Heading level={1} size="6xl" fontWeight="bold" className="mb-4">
        404
      </Heading>
      <Text variantColor="slateGray" size="xl" className="mb-2">
        お探しのページが見つかりません。
      </Text>
      <Text size="lg" variantColor="slateGray" className="mb-6">
        ページが存在しないか、URLが間違っている可能性があるため表示することができません。
      </Text>
      <Link href="/">
        <Button variant="primary">ホームに戻る</Button>
      </Link>
    </div>
  )
}
