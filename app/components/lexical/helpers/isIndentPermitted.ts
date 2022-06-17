import { $getListDepth, $isListItemNode, $isListNode } from '@lexical/list'
import { $getSelection, $isRangeSelection } from 'lexical'
import { getElementNodesInSelection } from './getElementNodesInSelection'

export function isIndentPermitted(maxDepth: number) {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) {
    return false
  }

  const elementNodesInSelection = getElementNodesInSelection(selection)

  let totalDepth = 0

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth)
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent()
      if (!$isListNode(parent)) {
        throw new Error(
          'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.'
        )
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth)
    }
  }

  return totalDepth <= maxDepth
}
