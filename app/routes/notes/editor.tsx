import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { TRANSFORMERS } from '@lexical/markdown'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import type { LinksFunction } from '@remix-run/node'
import type { ComponentProps } from 'react'
import { PlaygroundAutoLinkPlugin } from '~/components/lexical-plugins/AutoLinkPlugin'
import { CodeHighlightPlugin } from '~/components/lexical-plugins/CodeHighlightPlugin'
import { LexicalTheme } from '~/components/lexical-plugins/LexicalTheme'
import { ListMaxIndentLevelPlugin } from '~/components/lexical-plugins/ListMaxIndentLevelPlugin'
import { ToolbarPlugin } from '~/components/lexical-plugins/ToolbarPlugin'
import { TreeViewPlugin } from '~/components/lexical-plugins/TreeViewPlugin'
import editorStyles from './editor.css'

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: editorStyles
    }
  ]
}

const editorConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
  namespace: 'Universal',
  theme: LexicalTheme,
  // Handling of errors during update
  onError(error) {
    throw error
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
}

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <TreeViewPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <PlaygroundAutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  )
}
