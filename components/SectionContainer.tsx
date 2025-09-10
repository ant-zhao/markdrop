import { ReactNode } from 'react'

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer(
  {
    children,
    className,
  }: Props) {
  return (
    <div className={'mx-auto max-w-4xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 ' + className}>
      {children}
    </div>
  )
}
