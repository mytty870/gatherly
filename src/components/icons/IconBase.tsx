// export type IconBaseProps = {
//   title?: string
//   children: React.ReactNode
//   fill?: string
// }
export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  title?: string
}

export const IconBase = ({
  children,
  title,
  fill = 'currentcolor',
  ...props
}: IconBaseProps) => {
  return (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}
