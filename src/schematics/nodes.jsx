import { Handle, Position } from '@xyflow/react'
import { Cloud, Smartphone, User, GitBranch, Wrench, Boxes, Zap } from 'lucide-react'

const ICONES = { cloud: Cloud, smartphone: Smartphone, user: User, gitbranch: GitBranch, wrench: Wrench, boxes: Boxes, zap: Zap }

// Container: caixa grande com cabeçalho (ícone + título), à imagem das caixas
// "SAP BTP" / "Generative AI Hub" / "SAP Solutions" dos diagramas de
// referência do Architecture Center. dashed=true para caixas de fronteira
// (on-prem, 3rd party). focus=true acende a borda magenta ("Focus
// Components"); dimmed=true esbate para o cinzento (cenário sem esta peça).
export function ContainerNode({ data }) {
  const { titulo, icone, dashed, focus, dimmed, corBase } = data
  const Icone = ICONES[icone]
  const cor = focus ? '#c026d3' : corBase || '#2563eb'
  return (
    <div
      className="h-full w-full rounded-xl p-2.5 transition-all duration-300"
      style={{
        background: dimmed ? '#f8fafc' : focus ? 'rgba(192,38,211,0.04)' : 'rgba(37,99,235,0.045)',
        border: `${focus ? 2 : 1.5}px ${dashed ? 'dashed' : 'solid'} ${dimmed ? '#cbd5e1' : cor}`,
        opacity: dimmed ? 0.35 : 1,
        filter: dimmed ? 'grayscale(1)' : 'none',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <div className="flex items-center gap-1.5">
        {Icone && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded" style={{ background: dimmed ? '#94a3b8' : cor, color: 'white' }}>
            <Icone size={12} strokeWidth={2.5} aria-hidden="true" />
          </span>
        )}
        <span className="text-[12px] font-bold" style={{ color: dimmed ? '#94a3b8' : '#1e293b' }}>{titulo}</span>
      </div>
    </div>
  )
}

// Item: a "pill" pequena com o nome do serviço, para dentro dos containers.
export function ItemNode({ data }) {
  const { label, nota, focus, dimmed } = data
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-lg px-2 text-center transition-all duration-300"
      style={{
        background: dimmed ? '#f1f5f9' : focus ? '#fdf4ff' : 'white',
        border: `${focus ? 2 : 1}px solid ${dimmed ? '#e2e8f0' : focus ? '#c026d3' : '#93c5fd'}`,
        opacity: dimmed ? 0.35 : 1,
        filter: dimmed ? 'grayscale(1)' : 'none',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="t" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="b" style={{ opacity: 0 }} />
      <span className="text-[10px] font-semibold leading-tight" style={{ color: dimmed ? '#94a3b8' : '#1e293b' }}>{label}</span>
      {nota && <span className="text-[8px] italic leading-tight" style={{ color: dimmed ? '#cbd5e1' : '#64748b' }}>{nota}</span>}
    </div>
  )
}

// Actor: ícone redondo + legenda por baixo, para User / Mobile-Desktop / System Trigger.
export function ActorNode({ data }) {
  const { label, icone, dimmed, destaque } = data
  const Icone = ICONES[icone] || User
  return (
    <div className="flex w-[110px] flex-col items-center gap-1 transition-all duration-300" style={{ opacity: dimmed ? 0.35 : 1, filter: dimmed ? 'grayscale(1)' : 'none' }}>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      {destaque ? (
        <span className="rounded-full border-2 border-fuchsia-500 bg-fuchsia-50 px-2 py-1 text-[10px] font-bold text-fuchsia-700">{label}</span>
      ) : (
        <>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-700 text-slate-700"><Icone size={18} aria-hidden="true" /></span>
          <span className="text-center text-[10px] font-medium leading-tight text-slate-700">{label}</span>
        </>
      )}
    </div>
  )
}

// Divisor vertical "NETWORK", tal como nos diagramas de referência.
export function NetworkDivider({ data }) {
  return (
    <div className="flex h-full flex-col items-center">
      <span className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{data.label}</span>
      <div className="w-px flex-1 bg-slate-300" />
    </div>
  )
}

export const TIPOS_NO = { container: ContainerNode, item: ItemNode, actor: ActorNode, network: NetworkDivider }
