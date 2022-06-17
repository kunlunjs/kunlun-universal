import { $isAtNodeEnd } from '@lexical/selection'
import type { $getSelection, NodeSelection } from 'lexical'

export function getSelectedNode(
  selection: Exclude<ReturnType<typeof $getSelection>, NodeSelection | null>
) {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}