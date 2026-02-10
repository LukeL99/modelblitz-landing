import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from 'remotion'

const VOID = '#0A0A0B'
const SURFACE = '#141415'
const SURFACE_RAISED = '#1E1E20'
const BORDER = '#2A2A2D'
const EMBER = '#F97316'
const TEXT = '#F5F5F5'
const TEXT_SEC = '#A1A1AA'
const TEXT_MUTED = '#71717A'
const SUCCESS = '#22C55E'

const MODELS_DATA = [
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', accuracy: 96, latency: 1.8, cost: '$0.0045', score: 94.2 },
  { name: 'GPT-4o', provider: 'OpenAI', accuracy: 97, latency: 2.1, cost: '$0.0089', score: 89.1 },
  { name: 'Gemini 2.0 Pro', provider: 'Google', accuracy: 93, latency: 1.4, cost: '$0.0038', score: 88.7 },
  { name: 'DeepSeek V3', provider: 'DeepSeek', accuracy: 92, latency: 2.8, cost: '$0.0014', score: 87.3 },
  { name: 'Claude 3.5 Haiku', provider: 'Anthropic', accuracy: 88, latency: 0.6, cost: '$0.0008', score: 86.1 },
  { name: 'Mistral Large', provider: 'Mistral', accuracy: 90, latency: 1.9, cost: '$0.0036', score: 84.5 },
  { name: 'GPT-4o-mini', provider: 'OpenAI', accuracy: 87, latency: 0.9, cost: '$0.0006', score: 83.9 },
  { name: 'Qwen 2.5 72B', provider: 'Alibaba', accuracy: 89, latency: 2.4, cost: '$0.0018', score: 82.1 },
  { name: 'Gemini 2.0 Flash', provider: 'Google', accuracy: 84, latency: 0.5, cost: '$0.0003', score: 81.4 },
  { name: 'Llama 3.3 70B', provider: 'Meta', accuracy: 86, latency: 1.7, cost: '$0.0012', score: 80.2 },
]

const ALL_MODELS = [
  'GPT-4.5', 'GPT-4o', 'GPT-4o-mini', 'Claude 3 Opus', 'Claude 3.5 Sonnet',
  'Claude 3.5 Haiku', 'Gemini Ultra', 'Gemini Pro', 'Gemini Flash',
  'DeepSeek R1', 'DeepSeek V3', 'Mistral Large', 'Mistral Small',
  'Llama 3.3 70B', 'Llama 3.3 8B', 'Command R+', 'Qwen 2.5 72B',
  'Mixtral 8x22B', 'Gemma 2 27B', 'Phi-3 Medium',
]

// Scene 1: Input (frames 0-90)
function InputScene() {
  const frame = useCurrentFrame()

  const promptText = `Extract structured product data from the following product listing text. Return valid JSON matching this schema:
{
  "name": string,
  "brand": string,
  "price": number,
  "category": string,
  "features": string[]
}`

  const charsVisible = Math.min(Math.floor(frame * 3.5), promptText.length)
  const visibleText = promptText.slice(0, charsVisible)

  const containerOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })
  const labelOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' })

  const expectedText = `{
  "name": "WH-1000XM5",
  "brand": "Sony",
  "price": 279.99,
  "category": "Headphones"
}`
  const expectedStart = 55
  const expectedChars = Math.max(0, Math.min(Math.floor((frame - expectedStart) * 4), expectedText.length))
  const expectedVisible = expectedText.slice(0, expectedChars)
  const expectedLabelOp = interpolate(frame, [50, 55], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: VOID, padding: 48, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ opacity: labelOpacity, fontSize: 14, color: TEXT_MUTED, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 8 }}>
        YOUR PROMPT
      </div>
      <div style={{
        opacity: containerOpacity,
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: 20,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 15,
        color: TEXT,
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap' as const,
        minHeight: 160,
      }}>
        {visibleText}
        {charsVisible < promptText.length && (
          <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0, color: EMBER }}>▌</span>
        )}
      </div>

      <div style={{ opacity: expectedLabelOp, fontSize: 14, color: TEXT_MUTED, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginTop: 20, marginBottom: 8 }}>
        EXPECTED OUTPUT
      </div>
      <div style={{
        opacity: expectedLabelOp,
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: 20,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 15,
        color: SUCCESS,
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap' as const,
        minHeight: 100,
      }}>
        {expectedVisible}
        {expectedChars < expectedText.length && expectedChars > 0 && (
          <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0, color: EMBER }}>▌</span>
        )}
      </div>
    </AbsoluteFill>
  )
}

// Scene 2: Model Selection (frames 90-150)
function ModelSelectionScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  void fps

  return (
    <AbsoluteFill style={{ background: VOID, padding: 48, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 14, color: TEXT_MUTED, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 16 }}>
        SELECTING MODELS
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
        {ALL_MODELS.map((model, i) => {
          const delay = i * 2
          const isVisible = frame > delay
          const scale = isVisible ? spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 200 } }) : 0
          const isChecked = frame > delay + 8

          return (
            <div key={model} style={{
              transform: `scale(${scale})`,
              background: isChecked ? `${EMBER}15` : SURFACE,
              border: `1px solid ${isChecked ? EMBER : BORDER}`,
              borderRadius: 8,
              padding: '10px 16px',
              fontSize: 14,
              color: isChecked ? TEXT : TEXT_SEC,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: `2px solid ${isChecked ? EMBER : BORDER}`,
                background: isChecked ? EMBER : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: 'white',
                fontWeight: 700,
              }}>
                {isChecked ? '✓' : ''}
              </div>
              {model}
            </div>
          )
        })}
      </div>
      <div style={{
        marginTop: 24,
        fontSize: 16,
        color: TEXT_SEC,
        opacity: interpolate(frame, [40, 50], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        {Math.min(ALL_MODELS.length, Math.floor(frame / 2.5))} of {ALL_MODELS.length} models selected
      </div>
    </AbsoluteFill>
  )
}

// Scene 3: Processing (frames 150-250)
function ProcessingScene() {
  const frame = useCurrentFrame()
  const totalFrames = 100
  const modelsToShow = MODELS_DATA.slice(0, 8)

  const progress = interpolate(frame, [0, totalFrames - 10], [0, 100], { extrapolateRight: 'clamp' })
  const modelsComplete = Math.min(20, Math.floor(frame / 4.5))

  return (
    <AbsoluteFill style={{ background: VOID, padding: 48, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 4 }}>
        Running your benchmark...
      </div>
      <div style={{ fontSize: 14, color: TEXT_SEC, marginBottom: 20 }}>
        Testing model {Math.min(20, modelsComplete + 1)} of 20
      </div>

      {/* Progress bar */}
      <div style={{ background: BORDER, borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 28 }}>
        <div style={{
          background: EMBER,
          height: '100%',
          width: `${progress}%`,
          borderRadius: 6,
          transition: 'width 0.1s',
          boxShadow: `0 0 12px ${EMBER}80`,
        }} />
      </div>

      {/* Model list */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
        {modelsToShow.map((model, i) => {
          const modelFrame = i * 10
          const isDone = frame > modelFrame + 12
          const isRunning = frame > modelFrame && !isDone

          const rowStart = Math.max(0, modelFrame - 5)
          const rowEnd = Math.max(rowStart + 1, modelFrame)
          const rowOp = interpolate(frame, [rowStart, rowEnd], [0.4, 1], { extrapolateRight: 'clamp' })
          const latStart = modelFrame
          const latEnd = modelFrame + 12
          const latencyDisplay = isDone ? `${model.latency}s` : isRunning ? `${(interpolate(frame, [latStart, latEnd], [0, model.latency], { extrapolateRight: 'clamp' })).toFixed(1)}s` : '...'

          return (
            <div key={model.name} style={{
              opacity: rowOp,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              background: isDone ? `${SUCCESS}08` : isRunning ? `${EMBER}08` : 'transparent',
              borderRadius: 8,
              fontSize: 14,
            }}>
              <span style={{ fontSize: 16 }}>
                {isDone ? '✅' : isRunning ? '⏳' : '⬜'}
              </span>
              <span style={{ color: TEXT, fontWeight: 500, width: 180 }}>{model.name}</span>
              <span style={{ color: TEXT_MUTED, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, width: 50 }}>
                {latencyDisplay}
              </span>
              <span style={{ color: isDone ? SUCCESS : isRunning ? EMBER : TEXT_MUTED, fontSize: 12 }}>
                {isDone ? 'Done' : isRunning ? 'Running' : 'Queued'}
              </span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// Scene 4: Results (frames 250-360)
function ResultsScene() {
  const frame = useCurrentFrame()

  const headerOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
  const headerY = interpolate(frame, [0, 15], [10, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: VOID, padding: 40, fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Winner banner */}
      <div style={{
        opacity: headerOp,
        transform: `translateY(${headerY}px)`,
        background: `${EMBER}12`,
        border: `1px solid ${EMBER}`,
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 12, color: EMBER, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
            🏆 RECOMMENDED
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginTop: 4 }}>
            Claude 3.5 Sonnet
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ color: TEXT_MUTED, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const }}>Accuracy</div>
            <div style={{ color: SUCCESS, fontWeight: 700, fontSize: 20, fontFamily: 'JetBrains Mono, monospace' }}>
              {Math.min(96, Math.round(interpolate(frame, [15, 40], [0, 96], { extrapolateRight: 'clamp' })))}
            </div>
          </div>
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ color: TEXT_MUTED, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const }}>Speed</div>
            <div style={{ color: TEXT, fontWeight: 700, fontSize: 20, fontFamily: 'JetBrains Mono, monospace' }}>1.8s</div>
          </div>
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ color: TEXT_MUTED, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const }}>Cost</div>
            <div style={{ color: SUCCESS, fontWeight: 700, fontSize: 20, fontFamily: 'JetBrains Mono, monospace' }}>$0.0045</div>
          </div>
        </div>
      </div>

      {/* Results table */}
      <div style={{ background: SURFACE, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'flex',
          padding: '10px 16px',
          background: SURFACE_RAISED,
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          color: TEXT_MUTED,
        }}>
          <div style={{ width: 40 }}>#</div>
          <div style={{ flex: 1 }}>Model</div>
          <div style={{ width: 90, textAlign: 'center' as const }}>Accuracy</div>
          <div style={{ width: 80, textAlign: 'center' as const }}>Speed</div>
          <div style={{ width: 90, textAlign: 'right' as const }}>Cost/Query</div>
          <div style={{ width: 70, textAlign: 'center' as const }}>Score</div>
        </div>

        {MODELS_DATA.slice(0, 7).map((model, i) => {
          const delay = 15 + i * 6
          const rowOp = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateRight: 'clamp' })
          const rowY = interpolate(frame, [delay, delay + 8], [8, 0], { extrapolateRight: 'clamp' })
          const isWinner = i === 0

          const scoreColor = model.score >= 88 ? SUCCESS : model.score >= 80 ? '#EAB308' : '#EF4444'

          return (
            <div key={model.name} style={{
              opacity: rowOp,
              transform: `translateY(${rowY}px)`,
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              fontSize: 14,
              borderBottom: `1px solid ${BORDER}`,
              background: isWinner ? `${EMBER}08` : 'transparent',
              borderLeft: isWinner ? `3px solid ${EMBER}` : '3px solid transparent',
            }}>
              <div style={{ width: 40, color: isWinner ? EMBER : TEXT_MUTED, fontWeight: 600 }}>
                {isWinner ? '🏆' : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: TEXT, fontWeight: 500 }}>{model.name}</span>
                <span style={{ color: TEXT_MUTED, fontSize: 12, marginLeft: 8 }}>{model.provider}</span>
              </div>
              <div style={{ width: 90, textAlign: 'center' as const }}>
                <span style={{
                  background: `${SUCCESS}20`,
                  color: SUCCESS,
                  borderRadius: 9999,
                  padding: '2px 8px',
                  fontSize: 12,
                  fontWeight: 600,
                }}>{model.accuracy}</span>
              </div>
              <div style={{ width: 80, textAlign: 'center' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TEXT_SEC }}>
                {model.latency}s
              </div>
              <div style={{ width: 90, textAlign: 'right' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TEXT_SEC }}>
                {model.cost}
              </div>
              <div style={{ width: 70, textAlign: 'center' as const }}>
                <span style={{
                  background: `${scoreColor}20`,
                  color: scoreColor,
                  borderRadius: 9999,
                  padding: '2px 8px',
                  fontSize: 12,
                  fontWeight: 600,
                }}>{model.score.toFixed(1)}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Savings callout */}
      <div style={{
        opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp' }),
        marginTop: 16,
        background: `${SUCCESS}10`,
        border: `1px solid ${SUCCESS}30`,
        borderRadius: 8,
        padding: '12px 16px',
        fontSize: 14,
        color: SUCCESS,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        💰 Switch from GPT-4o → save <strong style={{ fontWeight: 700 }}>$132/mo</strong> at 1,000 queries/day
      </div>
    </AbsoluteFill>
  )
}

export const DemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <Sequence from={0} durationInFrames={90}>
        <InputScene />
      </Sequence>
      <Sequence from={90} durationInFrames={60}>
        <ModelSelectionScene />
      </Sequence>
      <Sequence from={150} durationInFrames={100}>
        <ProcessingScene />
      </Sequence>
      <Sequence from={250} durationInFrames={110}>
        <ResultsScene />
      </Sequence>
    </AbsoluteFill>
  )
}
