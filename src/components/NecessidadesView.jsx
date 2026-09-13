import { useState, useMemo } from 'react'
import { Check, ChevronRight, Users, Layers, HelpCircle, AlertTriangle, ArrowRight, Package } from 'lucide-react'
import { AREAS, CAPACIDADES } from '../necessidades/capacidades.js'
import { PACOTES } from '../necessidades/pacotes.js'
import { calcular, sugerirVia, RAZOES_VIA } from '../necessidades/motor.js'
import { LAYERS } from '../data.js'
import { obterIcone } from '../icons.js'

const CLASSE_RAZAO = {
  base: { pt: 'base', cor: '#64748b' },
  nucleo: { pt: 'essencial', cor: '#0ea5e9' },
  conformidade: { pt: 'obrigatório em PT', cor: '#f43f5e' },
  apoio: { pt: 'escolhido', cor: '#10b981' },
  dependencia: { pt: 'dependência', cor: '#8b5cf6' },
  extra: { pt: 'transformação', cor: '#f59e0b' },
}

export default function NecessidadesView({ t, idioma, onAbrirServico, onVerNoMapa }) {
  const lang = idioma === 'pt' ? 'pt' : 'en'
  const [seleccionadas, setSeleccionadas] = useState(PACOTES[0].capacidades)
  const [pacoteActivo, setPacoteActivo] = useState(PACOTES[0].id)
  const [apoiosLigados, setApoiosLigados] = useState([])
  const [extras, setExtras] = useState([])
  const [via, setVia] = useState(PACOTES[0].via)
  const [pessoas, setPessoas] = useState(60)
  const [temSapAntigo, setTemSapAntigo] = useState(false)
  const [muitoCodigo, setMuitoCodigo] = useState(false)
  const [papelAberto, setPapelAberto] = useState(null)
  const [tocouPapel, setTocouPapel] = useState(false)

  const resultado = useMemo(
    () => calcular(seleccionadas, { via, pais: 'PT', apoiosLigados, extras }),
    [seleccionadas, via, apoiosLigados, extras],
  )
  const sugestao = useMemo(
    () => sugerirVia({ capacidadeIds: seleccionadas, pessoas, temSapAntigo, muitoCodigoAMedida: muitoCodigo }),
    [seleccionadas, pessoas, temSapAntigo, muitoCodigo],
  )

  function carregarPacote(p) {
    setPacoteActivo(p.id)
    setSeleccionadas(p.capacidades)
    setVia(p.via)
    setExtras(p.extras ?? [])
    setApoiosLigados([])
  }

  function alternarCapacidade(id) {
    setPacoteActivo(null)
    setSeleccionadas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function alternarApoio(id) {
    setApoiosLigados((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const apoiosUnicos = useMemo(() => {
    const vistos = new Map()
    for (const a of resultado.apoiosDisponiveis) if (!vistos.has(a.id)) vistos.set(a.id, a)
    return [...vistos.values()]
  }, [resultado])

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden lg:flex-row">
      {/* ---------------- ESQUERDA: situação e necessidades ---------------- */}
      <div className="vidro flex w-full shrink-0 flex-col overflow-y-auto rounded-2xl p-3 lg:w-[300px]">
        <h2 className="flex items-center gap-1.5 text-[13px] font-bold text-gray-100">
          <Package size={14} aria-hidden="true" /> {t('necSituacao')}
        </h2>
        <p className="mt-0.5 text-[11px] leading-snug text-gray-400">{t('necSituacaoAjuda')}</p>

        <div className="mt-2 space-y-1.5">
          {PACOTES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => carregarPacote(p)}
              aria-pressed={pacoteActivo === p.id}
              className={`w-full rounded-xl border p-2 text-left transition-colors ${
                pacoteActivo === p.id ? 'border-sky-400/60 bg-sky-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="block text-[12px] font-semibold text-gray-100">{p.nome[lang] ?? p.nome.pt}</span>
              <span className="mt-0.5 block text-[10px] leading-snug text-gray-400">{p.perfil[lang] ?? p.perfil.pt}</span>
              <span className="mt-1 block text-[9px] text-gray-500">{p.dimensao[lang] ?? p.dimensao.pt}</span>
            </button>
          ))}
        </div>

        <h3 className="mt-4 text-[12px] font-bold text-gray-100">{t('necCapacidades')}</h3>
        <p className="mt-0.5 text-[10px] text-gray-500">{t('necCapacidadesAjuda')}</p>
        {AREAS.map((area) => {
          const daArea = CAPACIDADES.filter((c) => c.area === area.id)
          if (daArea.length === 0) return null
          return (
            <div key={area.id} className="mt-2.5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wide" style={{ color: area.cor }}>
                {area.nome[lang] ?? area.nome.pt}
              </p>
              <div className="space-y-1">
                {daArea.map((c) => {
                  const on = seleccionadas.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => alternarCapacidade(c.id)}
                      aria-pressed={on}
                      className={`flex w-full items-start gap-1.5 rounded-lg border p-1.5 text-left transition-colors ${
                        on ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/10'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                          on ? 'border-emerald-400 bg-emerald-500/80' : 'border-white/25'
                        }`}
                        aria-hidden="true"
                      >
                        {on && <Check size={9} strokeWidth={3} className="text-white" />}
                      </span>
                      <span className="text-[11px] leading-snug text-gray-200">{c.nome[lang] ?? c.nome.pt}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------------- CENTRO: o que precisa de contratar ---------------- */}
      <div className="vidro flex min-w-0 flex-1 flex-col overflow-y-auto rounded-2xl p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="flex items-center gap-1.5 text-[15px] font-extrabold text-gray-100">
            <Layers size={15} aria-hidden="true" /> {t('necLandscape')}
          </h2>
          <span className="text-[11px] text-gray-400">{t('necTotalPecas').replace('{n}', resultado.total)}</span>
        </div>

        {/* via de contrato */}
        <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-300">{t('necVia')}</span>
            {['cloud', 'rise', 'onprem'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVia(v)}
                aria-pressed={via === v}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${via === v ? 'bg-sky-500/90 text-white' : 'text-gray-400 hover:bg-white/10'}`}
              >
                {t(`necVia_${v}`)}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
            <label className="flex items-center gap-1.5">
              {t('necPessoas')}
              <input type="number" min="1" value={pessoas} onChange={(e) => setPessoas(Number(e.target.value) || 1)} className="w-16 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-gray-100" />
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={temSapAntigo} onChange={(e) => setTemSapAntigo(e.target.checked)} className="accent-sky-500" />
              {t('necJaTemSap')}
            </label>
            {temSapAntigo && (
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={muitoCodigo} onChange={(e) => setMuitoCodigo(e.target.checked)} className="accent-sky-500" />
                {t('necMuitoCodigo')}
              </label>
            )}
          </div>
          <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-sky-200">
            <ArrowRight size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
            {RAZOES_VIA[sugestao.chave][lang] ?? RAZOES_VIA[sugestao.chave].pt}
          </p>
        </div>

        {/* peças por camada */}
        <div className="mt-3 space-y-2.5">
          {resultado.porCamada.map((grupo) => {
            const layer = LAYERS.find((l) => l.id === grupo.camada)
            return (
              <section key={grupo.camada}>
                <h3 className="mb-1 text-[10px] font-bold uppercase tracking-wide" style={{ color: layer.corVar }}>
                  {layer.nome}
                </h3>
                <div className="space-y-1.5">
                  {grupo.pecas.map(({ id, servico, razoes }) => {
                    const Icone = obterIcone(servico.tipo)
                    return (
                      <div key={id} className="rounded-xl border border-white/10 bg-white/5 p-2">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${layer.corVar} 18%, transparent)`, color: layer.corVar }}>
                            <Icone size={13} aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <button type="button" onClick={() => onAbrirServico(id)} className="text-left text-[12px] font-semibold text-gray-100 hover:text-sky-300">
                              {servico.nome}
                            </button>
                            <div className="mt-0.5 flex flex-wrap gap-1">
                              {razoes.map((r, i) => (
                                <span key={i} className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: `color-mix(in srgb, ${CLASSE_RAZAO[r.classe].cor} 20%, transparent)`, color: CLASSE_RAZAO[r.classe].cor }}>
                                  {t(`necClasse_${r.classe}`)}
                                </span>
                              ))}
                            </div>
                            <ul className="mt-1 space-y-0.5">
                              {razoes.map((r, i) => (
                                <li key={i} className="text-[10px] leading-snug text-gray-400">
                                  {r.motivo[lang] ?? r.motivo.pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* perguntas que mudam a recomendação */}
        {apoiosUnicos.length > 0 && (
          <section className="mt-4">
            <h3 className="flex items-center gap-1.5 text-[12px] font-bold text-gray-100">
              <HelpCircle size={13} aria-hidden="true" /> {t('necPerguntas')}
            </h3>
            <p className="mt-0.5 text-[10px] text-gray-500">{t('necPerguntasAjuda')}</p>
            <div className="mt-1.5 space-y-1">
              {apoiosUnicos.map((a) => {
                const on = apoiosLigados.includes(a.id)
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => alternarApoio(a.id)}
                    aria-pressed={on}
                    className={`flex w-full items-start gap-2 rounded-lg border p-1.5 text-left transition-colors ${
                      on ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/10'
                    }`}
                  >
                    <span className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${on ? 'border-emerald-400 bg-emerald-500/80' : 'border-white/25'}`} aria-hidden="true">
                      {on && <Check size={9} strokeWidth={3} className="text-white" />}
                    </span>
                    <span className="min-w-0 text-[11px] leading-snug text-gray-300">
                      <strong className="text-gray-100">{a.servico.nome}</strong> — {a.quando[lang] ?? a.quando.pt}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* decisões e notas honestas */}
        {(resultado.decisoes.length > 0 || resultado.notas.length > 0) && (
          <section className="mt-4">
            <h3 className="flex items-center gap-1.5 text-[12px] font-bold text-gray-100">
              <AlertTriangle size={13} aria-hidden="true" /> {t('necDecisoes')}
            </h3>
            <div className="mt-1.5 space-y-1.5">
              {resultado.decisoes.map(({ capacidade, texto }) => (
                <p key={`d-${capacidade.id}`} className="rounded-lg border-l-2 border-amber-400/60 bg-amber-400/5 p-2 text-[11px] leading-snug text-gray-300">
                  <strong className="text-amber-200">{capacidade.nome[lang] ?? capacidade.nome.pt}: </strong>
                  {texto[lang] ?? texto.pt}
                </p>
              ))}
              {resultado.notas.map(({ capacidade, texto }) => (
                <p key={`n-${capacidade.id}`} className="rounded-lg border-l-2 border-rose-400/60 bg-rose-400/5 p-2 text-[11px] leading-snug text-gray-300">
                  <strong className="text-rose-200">{capacidade.nome[lang] ?? capacidade.nome.pt}: </strong>
                  {texto[lang] ?? texto.pt}
                </p>
              ))}
            </div>
          </section>
        )}

        <button type="button" onClick={onVerNoMapa} className="mt-4 flex w-fit items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-200 hover:bg-white/10">
          {t('esquemaVerPortefolio')} <ChevronRight size={12} aria-hidden="true" />
        </button>
      </div>

      {/* ---------------- DIREITA: o que dar aos empregados ---------------- */}
      <div className="vidro flex w-full shrink-0 flex-col overflow-y-auto rounded-2xl p-3 lg:w-[330px]">
        <h2 className="flex items-center gap-1.5 text-[13px] font-bold text-gray-100">
          <Users size={14} aria-hidden="true" /> {t('necEmpregados')}
        </h2>
        <p className="mt-0.5 text-[11px] leading-snug text-gray-400">{t('necEmpregadosAjuda')}</p>

        <div className="mt-2 space-y-1.5">
          {resultado.papeis.map((p) => {
            const aberto = tocouPapel ? papelAberto === p.id : resultado.papeis[0]?.id === p.id
            return (
              <div key={p.id} className="rounded-xl border border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={() => { setTocouPapel(true); setPapelAberto(aberto ? null : p.id) }}
                  aria-expanded={aberto}
                  className="flex w-full items-center justify-between gap-2 p-2 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-[12px] font-semibold text-gray-100">{p.nome[lang] ?? p.nome.pt}</span>
                    <span className="block text-[10px] leading-snug text-gray-400">{p.oQueFaz[lang] ?? p.oQueFaz.pt}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-200">
                    {p.apps.length}
                  </span>
                </button>

                {aberto && (
                  <div className="border-t border-white/10 p-2">
                    <ul className="space-y-1.5">
                      {p.apps.map((a) => (
                        <li key={a.nome} className="rounded-lg bg-white/[0.04] p-1.5">
                          <button type="button" onClick={() => onAbrirServico(a.servicoId)} className="text-left text-[11px] font-semibold text-gray-100 hover:text-sky-300">
                            {a.nome}
                          </button>
                          <p className="text-[10px] leading-snug text-gray-400">{a.faz[lang] ?? a.faz.pt}</p>
                          <p className="mt-0.5 text-[9px] text-gray-500">{a.dispositivo}</p>
                        </li>
                      ))}
                    </ul>
                    {p.appsEmFalta.length > 0 && (
                      <div className="mt-1.5 rounded-lg border border-dashed border-white/15 p-1.5">
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">{t('necAppsBloqueadas')}</p>
                        <ul className="mt-0.5 space-y-0.5">
                          {p.appsEmFalta.map((a) => (
                            <li key={a.nome} className="text-[10px] leading-snug text-gray-500">
                              {a.nome} — {t('necRequer').replace('{s}', a.requer)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {p.nota && <p className="mt-1.5 text-[10px] leading-snug text-amber-200/80">{p.nota[lang] ?? p.nota.pt}</p>}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-3 text-[10px] leading-snug text-gray-500">{t('necRodape')}</p>
      </div>
    </div>
  )
}
