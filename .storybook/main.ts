import type { StorybookConfig } from '@storybook/nextjs'
import { features } from 'process'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx|ts|jsx|js)', '../src/**/*.mdx'],
  features: { experimentalRSC: true },
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
}
export default config
