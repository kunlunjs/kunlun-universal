import type { ComponentProps, FC } from 'react'
import type ReactMarkdown from 'react-markdown'
import { useModuleLoader } from '~/module.loader'

interface ReactMarkdownAliasProps
  extends ComponentProps<typeof ReactMarkdown> {}

export const ReactMarkdownAlias: FC<ReactMarkdownAliasProps> = props => {
  const { default: ReactMarkdown } = useModuleLoader('react-markdown')
  return <ReactMarkdown {...props} />
}
