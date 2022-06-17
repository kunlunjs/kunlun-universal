import { $createCodeNode } from '@lexical/code'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { $wrapLeafNodesInElements } from '@lexical/selection'
import type { LexicalEditor } from 'lexical'
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical'
import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

export function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown
}: {
  editor: LexicalEditor
  blockType: string
  toolbarRef: RefObject<HTMLDivElement>
  setShowBlockOptionsDropDown: (arg: boolean) => void
}) {
  const dropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const toolbar = toolbarRef.current
    const dropDown = dropDownRef.current

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect()
      dropDown.style.top = `${top + 40}px`
      dropDown.style.left = `${left}px`
    }
  }, [dropDownRef, toolbarRef])

  useEffect(() => {
    const dropDown = dropDownRef.current
    const toolbar = toolbarRef.current

    if (dropDown !== null && toolbar !== null) {
      const handle: Parameters<typeof document.addEventListener>[1] = event => {
        const target = event.target as Node

        if (target && !dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false)
        }
      }
      document.addEventListener('click', handle)

      return () => {
        document.removeEventListener('click', handle)
      }
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef])

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h1'))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h2'))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      // @ts-ignore
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
    } else {
      // @ts-ignore
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      // @ts-ignore
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
    } else {
      // @ts-ignore
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createCodeNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  return (
    <div className="dropdown" ref={dropDownRef}>
      <button className="item" onClick={formatParagraph}>
        <span className="icon paragraph" />
        <span className="text">Normal</span>
        {blockType === 'paragraph' && <span className="active" />}
      </button>
      <button className="item" onClick={formatLargeHeading}>
        <span className="icon large-heading" />
        <span className="text">Large Heading</span>
        {blockType === 'h1' && <span className="active" />}
      </button>
      <button className="item" onClick={formatSmallHeading}>
        <span className="icon small-heading" />
        <span className="text">Small Heading</span>
        {blockType === 'h2' && <span className="active" />}
      </button>
      <button className="item" onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === 'ul' && <span className="active" />}
      </button>
      <button className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === 'ol' && <span className="active" />}
      </button>
      <button className="item" onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === 'quote' && <span className="active" />}
      </button>
      <button className="item" onClick={formatCode}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === 'code' && <span className="active" />}
      </button>
    </div>
  )
}
