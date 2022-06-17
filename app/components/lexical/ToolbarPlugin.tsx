import {
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages
} from '@lexical/code'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, ListNode } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isHeadingNode } from '@lexical/rich-text'
import { $isParentElementRTL } from '@lexical/selection'
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey
} from 'lexical'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  BlockOptionsDropdownList,
  blockTypeToBlockName,
  FloatingLinkEditor,
  getSelectedNode,
  LowPriority,
  Select,
  supportedBlockTypes
} from './helpers'

function Divider() {
  return <div className="divider" />
}

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [blockType, setBlockType] = useState<string>('paragraph')
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  )
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false)
  const [codeLanguage, setCodeLanguage] = useState('')
  const [isRTL, setIsRTL] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsCode(selection.hasFormat('code'))
      setIsRTL($isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()
          return false
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(!!payload)
          return false
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(!!payload)
          return false
        },
        LowPriority
      )
    )
  }, [editor, updateToolbar])

  const codeLanguges = useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey]
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          // @ts-ignore
          editor.dispatchCommand(UNDO_COMMAND)
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          // @ts-ignore
          editor.dispatchCommand(REDO_COMMAND)
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="toolbar-item block-controls"
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
            aria-label="Formatting Options"
          >
            <span className={'icon block-type ' + blockType} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <i className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )}
          <Divider />
        </>
      )}
      {blockType === 'code' ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
            }}
            className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }}
            className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }}
            className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
            aria-label="Format Underline"
          >
            <i className="format underline" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            }}
            className={
              'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')
            }
            aria-label="Format Strikethrough"
          >
            <i className="format strikethrough" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
            }}
            className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
            aria-label="Insert Code"
          >
            <i className="format code" />
          </button>
          <button
            onClick={insertLink}
            className={'toolbar-item spaced ' + (isLink ? 'active' : '')}
            aria-label="Insert Link"
          >
            <i className="format link" />
          </button>
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
            }}
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <i className="format left-align" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
            }}
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <i className="format center-align" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
            }}
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <i className="format right-align" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
            }}
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <i className="format justify-align" />
          </button>{' '}
        </>
      )}
    </div>
  )
}
