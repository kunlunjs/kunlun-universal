import { ReactFlowRendererAlias as ReactFlow } from '~/components/react-flow-renderer'
import { ModulerLoader } from '~/module.loader'
// @ts-ignore
import { getReactFlowRenderer } from '../../../esm-module'

export default function FlowRouter() {
  return (
    <div className="mx-auto h-[90vh] w-[90vw] font-sans leading-6">
      <ModulerLoader imports={{ 'react-flow-render': getReactFlowRenderer }}>
        <ReactFlow />
      </ModulerLoader>
    </div>
  )
}
