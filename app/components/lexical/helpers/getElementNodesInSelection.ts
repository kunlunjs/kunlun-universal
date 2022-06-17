import type { $getSelection, NodeSelection } from 'lexical'
import { $isElementNode } from 'lexical'

export function getElementNodesInSelection(
  selection: Exclude<ReturnType<typeof $getSelection>, NodeSelection | null>
) {
  const nodesInSelection = selection.getNodes()

  if (nodesInSelection?.length === 0) {
    return new Set([
      selection!.anchor.getNode().getParentOrThrow(),
      selection!.focus.getNode().getParentOrThrow()
    ])
  }

  return new Set(
    nodesInSelection.map(n => ($isElementNode(n) ? n : n.getParentOrThrow()))
  )
}
