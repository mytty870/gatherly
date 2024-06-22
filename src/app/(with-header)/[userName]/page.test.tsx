import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserPagePresentation } from './page'
import {
  noteArticlesFixture,
  qiitaArticlesFixture,
  sizuArticlesFixture,
  zennArticlesFixture,
} from '@/test/fixtures/articles'
import { profileFixture } from '@/test/fixtures/profile'

describe('UserPagePresentation', () => {
  it('renders user profile and articles tabs', () => {
    render(
      <UserPagePresentation
        profile={profileFixture}
        zennArticles={zennArticlesFixture}
        sizuArticles={sizuArticlesFixture}
        qiitaArticles={qiitaArticlesFixture}
        noteArticles={noteArticlesFixture}
        isMyPage={true}
      />,
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Bio text')).toBeInTheDocument()
    expect(screen.getByText('Zenn Article 1')).toBeInTheDocument()
    expect(screen.queryByText('Sizu Article 1')).not.toBeInTheDocument()
  })
})
