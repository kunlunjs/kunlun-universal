import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { INDENT_CONTENT_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical'
import { useEffect } from 'react'
import { isIndentPermitted } from './helpers'

export function ListMaxIndentLevelPlugin(
  { maxDepth }: { maxDepth?: number } = { maxDepth: 7 }
) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? 7),
      COMMAND_PRIORITY_HIGH
    )
  }, [editor, maxDepth])

  return null
}
