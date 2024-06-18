'use client'

import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const Tabs = TabsPrimitive.Root

const TabsListVariants = cva(
  'inline-flex w-full items-center border-b font-medium',
  {
    variants: {
      evenlyDistribution: {
        true: 'grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] justify-center',
      },
    },
    defaultVariants: {
      evenlyDistribution: false,
    },
  },
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof TabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ evenlyDistribution, className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(TabsListVariants({ evenlyDistribution, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'border-b-2 border-transparentBlack data-[state=active]:border-black px-4 disabled:border-transparentBlack text-slateGray disabled:text-slateGray hover:border-black items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:text-black hover:text-black h-12',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('', className)} {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
