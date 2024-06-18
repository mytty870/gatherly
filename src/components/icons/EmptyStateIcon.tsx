import { IconBase, IconBaseProps } from './IconBase'

export const EmptyStateIcon = (props: IconBaseProps) => {
  return (
    <IconBase viewBox="0 0 64 64" width="18" height="18" {...props}>
      <rect x="4" y="16" width="56" height="36" fill="white" />
      <path
        d="M8 16h16l4 4h28v28H8V16z"
        fill="white"
        stroke="#c0c0c0"
        strokeWidth="2"
      />
    </IconBase>
  )
}
