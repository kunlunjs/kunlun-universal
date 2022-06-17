import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { MATCHERS } from './helpers'

export function PlaygroundAutoLinkPlugin() {
  return <AutoLinkPlugin matchers={MATCHERS} />
}
