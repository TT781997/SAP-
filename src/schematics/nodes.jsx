import { Handle, Position, BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react'
import { Cloud, Smartphone, User, Wrench, Zap, Server, Database, Radio, Factory, Shield } from 'lucide-react'

const ICONES = { cloud: Cloud, smartphone: Smartphone, user: User, wrench: Wrench, zap: Zap, server: Server, database: Database, radio: Radio, factory: Factory, shield: Shield }

// Cores por domínio (secção 17): BTP azul-petróleo, AI Hub rosa, identidade/
// confiança verde, Network tracejado, Non-SAP cinza, Azure azul, DR laranja.
export const COR_DOMINIO = {
  btp: '#0e7490',
  sap: '#0ea5e9',
  ai: '#d946ef',
  identidade: '#22c55e',
  azure: '#3b82f6',
  sci: '#8b5cf6',
  nonsap: '#64748b',
  onprem: '#94a3b8',
  dr: '#f97316',
  dados: '#06b6d4',
  alm: '#f43f5e',
}

function estiloEstado({ dimmed, focus }) {
  return {
    opacity: dimmed ? 0.28 : 1,
    filter: dimmed ? 'grayscale(1)' : 'none',
    boxShadow: focus ? '0 0 0 2px #d946ef, 0 0 18px rgba(217,70,239,0.35)' : undefined,
  }
}

// Container: caixa grande com número opcional (①…⑪) + ícone + título, no
// estilo dos diagramas do Architecture Center e do esquema Azure hub-spoke.
export function ContainerNode({ data }) {
  const { titulo, numero, icone, dashed, focus, dimmed, dominio = 'sap', subtitulo } = data
  const cor = focus ? COR_DOMINIO.ai : COR_DOMINIO[dominio]
  const Icone = ICONES[icone]
  return (
    <div
      className="h-full w-full rounded-xl p-2.5 transition-all duration-300"
      style={{
        background: `color-mix(in srgb, ${cor} 9%, transparent)`,
        border: `${focus ? 2 : 1.5}px ${dashed ? 'dashed' : 'solid'} color-mix(in srgb, ${cor} ${dimmed ? 30 : 70}%, transparent)`,
        ...estiloEstado({ dimmed, focus }),
      }}
    >
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
      <Handle type="target" position={Position.Top} id="t" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="b" className="opacity-0" />
      <div className="flex items-center gap-1.5">
        {numero && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: cor, color: '#070b14' }}>
            {numero}
          </span>
        )}
        {Icone && <Icone size={13} strokeWidth={2.5} style={{ color: cor }} aria-hidden="true" />}
        <span className="text-[12px] font-bold text-gray-100">{titulo}</span>
      </div>
      {subtitulo && <p className="mt-0.5 text-[9px] text-gray-400">{subtitulo}</p>}
    </div>
  )
}

// Item: "pill" com o nome do serviço. data.cardId liga ao catálogo (clique abre drawer).
export function ItemNode({ data }) {
  const { label, nota, focus, dimmed, dominio = 'sap', cardId } = data
  const cor = focus ? COR_DOMINIO.ai : COR_DOMINIO[dominio]
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center rounded-lg px-2 text-center transition-all duration-300 ${cardId ? 'cursor-pointer hover:scale-[1.03]' : ''}`}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: `${focus ? 2 : 1}px solid color-mix(in srgb, ${cor} ${dimmed ? 30 : 60}%, transparent)`,
        ...estiloEstado({ dimmed, focus }),
      }}
      title={cardId ? 'Clique para abrir no catálogo' : undefined}
    >
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
      <Handle type="target" position={Position.Top} id="t" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="b" className="opacity-0" />
      <span className="text-[10px] font-semibold leading-tight text-gray-100">{label}</span>
      {nota && <span className="text-[8px] italic leading-tight text-gray-400">{nota}</span>}
    </div>
  )
}

export function ActorNode({ data }) {
  const { label, icone, dimmed, destaque } = data
  const Icone = ICONES[icone] || User
  return (
    <div className="flex w-[110px] flex-col items-center gap-1 transition-all duration-300" style={estiloEstado({ dimmed })}>
      <Handle type="source" position={Position.Right} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="b" className="opacity-0" />
      {destaque ? (
        <span className="rounded-full border-2 border-fuchsia-400 bg-fuchsia-500/15 px-2 py-1 text-[10px] font-bold text-fuchsia-200">{label}</span>
      ) : (
        <>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-400 text-gray-200"><Icone size={18} aria-hidden="true" /></span>
          <span className="text-center text-[10px] font-medium leading-tight text-gray-300">{label}</span>
        </>
      )}
    </div>
  )
}

export function NetworkDivider({ data }) {
  return (
    <div className="flex h-full flex-col items-center">
      <span className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">{data.label}</span>
      <div className="w-px flex-1 border-l border-dashed border-gray-600" />
    </div>
  )
}

// SapEdge (secção 14): getSmoothStepPath + BaseEdge + EdgeLabelRenderer com o
// label SEMPRE visível. data.tipo escolhe cor/traço; data.animado liga o loop
// dashoffset (respeita prefers-reduced-motion via a classe .ligacao-animada
// já definida em index.css).
const COR_TIPO_EDGE = { nativa: '#38bdf8', extensao: '#a78bfa', rede: '#94a3b8', governa: '#fb7185', auth: '#22c55e', delegada: '#22c55e', provisioning: '#cbd5e1', dr: '#f97316', destaque: '#d946ef' }
const TRACO_TIPO_EDGE = { nativa: undefined, extensao: '6 4', rede: '2 3', governa: '7 3 1 3', auth: undefined, delegada: '7 5', provisioning: undefined, dr: '8 4', destaque: undefined }

export function SapEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, data = {}, markerEnd }) {
  const [caminho, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 8 })
  const tipo = data.tipo || 'nativa'
  const cor = data.dimmed ? '#475569' : COR_TIPO_EDGE[tipo]
  return (
    <>
      <BaseEdge
        id={id}
        path={caminho}
        markerEnd={markerEnd}
        className={data.animado && !data.dimmed ? 'ligacao-animada' : undefined}
        style={{ stroke: cor, strokeWidth: tipo === 'destaque' ? 2.2 : 1.6, strokeDasharray: data.animado ? undefined : TRACO_TIPO_EDGE[tipo], opacity: data.dimmed ? 0.35 : 0.9 }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-auto rounded px-1.5 py-0.5 text-[9px] font-semibold"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              background: '#0c1220',
              border: `1px solid ${cor}`,
              color: data.dimmed ? '#64748b' : cor,
              opacity: data.dimmed ? 0.5 : 1,
            }}
            title={data.frase}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export const TIPOS_NO = { container: ContainerNode, item: ItemNode, actor: ActorNode, network: NetworkDivider }
export const TIPOS_ARESTA = { sapEdge: SapEdge }
