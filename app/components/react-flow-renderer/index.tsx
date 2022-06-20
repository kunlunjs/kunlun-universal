import type {
  ReactFlowInstance,
  OnConnect,
  Edge,
  Node
} from 'react-flow-renderer'
import { useModuleLoader } from '~/module.loader'
import {
  nodes as initialNodes,
  edges as initialEdges
} from './initial-elements'

const onInit = (reactFlowInstance: ReactFlowInstance) =>
  console.log('flow loaded:', reactFlowInstance)

export const ReactFlowRendererAlias = () => {
  const {
    default: ReactFlow,
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType
  } = useModuleLoader('react-flow-renderer')

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges(MarkerType)
  )
  const onConnect: OnConnect = params =>
    setEdges((eds: Edge[]) => addEdge(params, eds))

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      onInit={onInit}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      attributionPosition="top-right"
    >
      <MiniMap
        nodeStrokeColor={(n: Node) => {
          if (n.style?.background) return n.style.background
          if (n.type === 'input') return '#0041d0'
          if (n.type === 'output') return '#ff0072'
          if (n.type === 'default') return '#1a192b'

          return '#eee'
        }}
        nodeColor={(n: Node) => {
          if (n.style?.background) return n.style.background

          return '#fff'
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  )
}
