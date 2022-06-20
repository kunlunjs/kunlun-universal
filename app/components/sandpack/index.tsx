import type {
  SandpackCodeOptions,
  SandpackFiles,
  SandpackSetup
} from '@codesandbox/sandpack-react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview
} from '@codesandbox/sandpack-react'
import type { FC } from 'react'
import { useMemo } from 'react'

const defaultSetup: SandpackSetup = {
  dependencies: {
    // packageName: version
  }
}

interface SandpackProps extends SandpackSetup {
  files: SandpackFiles
  additionalFiles?: string[]
  options?: SandpackCodeOptions
  activeFile?: string | null
  showEditor?: boolean
  showPreview?: boolean
  isTypeScript?: boolean
  editorHeight?: number
  editorWidthPercentage?: number
}

export const Sandpack: FC<SandpackProps> = ({
  files,
  additionalFiles = [],
  dependencies = {},
  options = {},
  activeFile = null,
  showEditor = true,
  showPreview = true,
  isTypeScript = true,
  editorHeight = 400,
  editorWidthPercentage = 45
}) => {
  const customSetup = useMemo(() => {
    return {
      ...defaultSetup,
      dependencies: {
        ...defaultSetup.dependencies,
        ...dependencies
      }
    }
  }, [])

  const panelStyle = { height: editorHeight }

  return (
    <div className="mb-5" style={{ minHeight: editorHeight }}>
      <SandpackProvider
        template={isTypeScript ? 'react-ts' : 'react'}
        customSetup={customSetup}
        files={{
          ...files
        }}
      >
        <SandpackLayout>
          {showEditor && (
            <SandpackCodeEditor wrapContent {...options} style={panelStyle} />
          )}
          {showPreview && <SandpackPreview style={panelStyle} />}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
