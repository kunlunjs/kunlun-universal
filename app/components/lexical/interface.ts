import type { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { ComponentProps } from 'react'

export type InitialConfig = ComponentProps<
  typeof LexicalComposer
>['initialConfig']
