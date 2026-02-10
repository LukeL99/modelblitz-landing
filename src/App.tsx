import { useState } from 'react'
import {
  Zap, DollarSign, Target, BarChart3, Trophy, CheckCircle, Clock,
  ChevronDown, ChevronUp, Menu, X, ArrowRight, Play, Shield, FileText
} from 'lucide-react'

const MODELS = [
  { rank: 1, model: 'Claude Sonnet 4.5', provider: 'Anthropic', accuracy: 96, speed: '1.6s', cost: '$0.0045', score: 94.2, winner: true },
  { rank: 2, model: 'GPT-4o', provider: 'OpenAI', accuracy: 95, speed: '1.8s', cost: '$0.0075', score: 89.1, winner: false },
  { rank: 3, model: 'Gemini 3 Pro', provider: 'Google', accuracy: 94, speed: '1.2s', cost: '$0.0042', score: 88.7, winner: false },
  { rank: 4, model: 'DeepSeek V3', provider: 'DeepSeek', accuracy: 92, speed: '2.4s', cost: '$0.0014', score: 87.3, winner: false },
  { rank: 5, model: 'Claude Haiku 4.5', provider: 'Anthropic', accuracy: 89, speed: '0.5s', cost: '$0.0012', score: 86.1, winner: false },
]

const FAQS = [
  {
    q: 'How does accuracy scoring work?',
    a: 'We use embedding-based semantic similarity to compare model outputs against your expected output. For JSON, we also check schema compliance and data extraction accuracy.'
  },
  {
    q: 'Which models do you test?',
    a: '20+ models from OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, Cohere, and more — spanning every price tier from $0.0001 to $0.06 per 1K tokens.'
  },
  {
    q: 'How long does a benchmark take?',
    a: 'Usually 2-4 minutes depending on prompt length and model response times. We run each model 3 times for consistency.'
  },
  {
    q: 'Do I need an API key?',
    a: 'Nope. We handle everything. Just paste your prompt and pay.'
  },
  {
    q: 'Can I test multimodal prompts?',
    a: 'Not yet — text-only for now. Multimodal and image prompts are coming soon.'
  },
  {
    q: 'What if I\'m not satisfied?',
    a: 'If we fail to deliver your report, full refund. No questions asked.'
  },
  {
    q: 'Is my prompt data private?',
    a: 'Your prompts are only used for benchmarking and deleted after 30 days. We never train on your data or share it.'
  },
]

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-success/15 text-success' : score >= 50 ? 'bg-warning/15 text-warning' : 'bg-danger/15 text-danger'
  return <span className={`${color} rounded-full px-2 py-0.5 text-xs font-semibold`}>{score}</span>
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-surface-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="font-medium text-text-primary pr-4">{q}</span>
        {open ? <ChevronUp className="shrink-0 text-text-muted" size={20} /> : <ChevronDown className="shrink-0 text-text-muted" size={20} />}
      </button>
      {open && <p className="pb-5 text-text-secondary leading-relaxed">{a}</p>}
    </div>
  )
}

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-surface-border/50 bg-void/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 md:px-6">
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="text-ember">Model</span>Pick
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#how" className="text-sm text-text-secondary hover:text-text-primary transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-text-secondary hover:text-text-primary transition-colors">FAQ</a>
            <a href="#cta" className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
              Run a Benchmark <ArrowRight size={16} />
            </a>
          </div>
          <button className="md:hidden text-text-secondary" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="flex flex-col gap-4 border-t border-surface-border px-4 pb-4 md:hidden">
            <a href="#how" onClick={() => setMobileMenu(false)} className="text-sm text-text-secondary">How it Works</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-sm text-text-secondary">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenu(false)} className="text-sm text-text-secondary">FAQ</a>
            <a href="#cta" onClick={() => setMobileMenu(false)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-4 py-2.5 text-sm font-semibold text-white">
              Run a Benchmark <ArrowRight size={16} />
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-[1200px] px-4 pt-20 pb-16 md:px-6 md:pt-28 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-[56px] lg:text-[64px]">
              Stop overpaying for AI.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
              Test your prompt against 20+ models. Get a ranked report with cost, speed, and accuracy scores. One report. Ten bucks.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="#cta" className="inline-flex items-center gap-2 rounded-lg bg-ember px-6 py-3.5 text-base font-semibold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-ember/20">
                Run a Benchmark — $9.99 <ArrowRight size={18} />
              </a>
              <a href="#how" className="inline-flex items-center gap-2 rounded-lg border border-surface-border px-6 py-3.5 text-base font-semibold text-text-secondary hover:bg-surface-raised hover:text-text-primary transition-colors">
                See how it works
              </a>
            </div>
            <p className="mt-6 text-sm text-text-muted">No API keys needed · Results in 3 minutes · No account required</p>
          </div>

          {/* Demo Video */}
          <div className="mt-12 md:mt-16 mx-auto max-w-4xl">
            <div className="relative rounded-xl border border-surface-border bg-surface overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-border bg-surface-raised">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-xs text-text-muted font-mono">modelpick.ai — benchmark report</span>
              </div>
              <video
                src="/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
                poster="/demo-poster.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="border-t border-surface-border bg-surface/50">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">How it works</h2>
          <p className="mt-4 text-center text-text-secondary">Three steps. Three minutes. Done.</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
            {[
              { icon: <FileText size={28} />, step: '1', title: 'Paste Your Prompt', desc: 'Drop in your system prompt, example input, and expected output. That\'s it.' },
              { icon: <Play size={28} />, step: '2', title: 'We Test 20+ Models', desc: 'Your prompt runs against models from OpenAI, Anthropic, Google, Meta, Mistral & more.' },
              { icon: <Trophy size={28} />, step: '3', title: 'Get Your Report', desc: 'Ranked results with cost, speed, and accuracy scores. Plus our recommendation.' },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-ember/10 text-ember">{icon}</div>
                <div className="mt-1 text-xs font-semibold text-ember">STEP {step}</div>
                <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Report Preview */}
      <section className="border-t border-surface-border">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">See a real report</h2>
          <p className="mt-4 text-center text-text-secondary">From a JSON data extraction benchmark</p>

          {/* Recommendation Card */}
          <div className="mt-12 mx-auto max-w-2xl rounded-xl border border-ember bg-surface p-6 md:p-8 shadow-[0_0_30px_rgba(249,115,22,0.08)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-ember uppercase tracking-wider">
              <Trophy size={16} /> Our Recommendation
            </div>
            <h3 className="mt-3 text-2xl font-semibold">Claude Sonnet 4.5</h3>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5"><Target size={14} className="text-success" /> 96/100 accuracy</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-ember-light" /> 1.6s latency</span>
              <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-success" /> $0.0045/query</span>
            </div>
            <p className="mt-4 text-text-secondary leading-relaxed">
              For this JSON extraction prompt, Claude Sonnet 4.5 offers the best balance of accuracy and cost. It scores 96% at less than half the cost of GPT-4o.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
              <DollarSign size={16} />
              <span>Switch from GPT-4o → save <strong>$90/mo</strong> at 1,000 queries/day</span>
            </div>
          </div>

          {/* Ranked Table */}
          <div className="mt-8 mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <th className="px-3 py-3 text-left">Rank</th>
                  <th className="px-3 py-3 text-left">Model</th>
                  <th className="px-3 py-3 text-left">Provider</th>
                  <th className="px-3 py-3 text-center">Accuracy</th>
                  <th className="px-3 py-3 text-center">Speed</th>
                  <th className="px-3 py-3 text-right">Cost/Query</th>
                  <th className="px-3 py-3 text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr key={m.rank} className={`border-b border-surface-border transition-colors hover:bg-surface-raised ${m.winner ? 'bg-ember/5 border-l-2 border-l-ember' : ''}`}>
                    <td className="px-3 py-3 text-text-muted">{m.winner ? <Trophy size={16} className="text-ember" /> : m.rank}</td>
                    <td className="px-3 py-3 font-medium">{m.model}</td>
                    <td className="px-3 py-3 text-text-secondary">{m.provider}</td>
                    <td className="px-3 py-3 text-center"><ScoreBadge score={m.accuracy} /></td>
                    <td className="px-3 py-3 text-center font-mono text-text-secondary">{m.speed}</td>
                    <td className="px-3 py-3 text-right font-mono text-text-secondary">{m.cost}</td>
                    <td className="px-3 py-3 text-center"><ScoreBadge score={Math.round(m.score)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">Showing top 5 of 20 models tested</p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-surface-border bg-surface/50">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">What we test</h2>
          <p className="mt-4 text-center text-text-secondary">Every dimension that matters for your use case</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Target size={24} />, title: 'Accuracy', desc: 'Semantic similarity to your expected output. JSON schema compliance. Format matching.' },
              { icon: <Zap size={24} />, title: 'Speed', desc: 'Time to first token. Total response time. Tokens per second across 3 runs.' },
              { icon: <DollarSign size={24} />, title: 'Cost', desc: 'Actual dollar cost per query. Monthly projection at your volume.' },
              { icon: <BarChart3 size={24} />, title: 'Consistency', desc: 'Run 3x per model. Measure variance. Flag unreliable models.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-surface-border bg-surface p-6 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember/10 text-ember">{icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Tested */}
      <section className="border-t border-surface-border">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">20+ models tested</h2>
          <p className="mt-4 text-center text-text-secondary">Every price tier — from $0.0001 to $0.06 per 1K tokens</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral', 'DeepSeek', 'Cohere', 'Alibaba', 'Microsoft', 'Amazon'].map((p) => (
              <div key={p} className="rounded-full border border-surface-border bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary">
                {p}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted">
            {['GPT-5.2', 'GPT-4o', 'GPT-4o Mini', 'Claude Opus 4.6', 'Claude Sonnet 4.5', 'Claude Haiku 4.5', 'Gemini 3 Pro', 'Gemini 3 Flash', 'Gemini 3 Flash 8B', 'DeepSeek R1', 'DeepSeek V3', 'Mistral Large 2', 'Mistral Small', 'Llama 4 405B', 'Llama 4 70B', 'Llama 4 8B', 'Command R+', 'Qwen 3 72B', 'Phi-4', 'Nova Micro'].map((m) => (
              <span key={m} className="rounded-md bg-surface-raised px-2 py-1">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-surface-border bg-surface/50">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">Simple pricing</h2>
          <p className="mt-4 text-center text-text-secondary">Spend $10, save $200/mo. No subscriptions required.</p>

          <div className="mt-12 mx-auto max-w-sm">
            <div className="rounded-xl border border-ember bg-surface p-8 text-center shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-wider text-ember">One Report</p>
              <div className="mt-3 text-5xl font-bold">$9.99</div>
              <p className="mt-2 text-sm text-text-muted">per benchmark report</p>
              <ul className="mt-6 space-y-3 text-left text-sm">
                {[
                  '20+ models tested',
                  '3 runs per model for consistency',
                  'Accuracy scoring vs your expected output',
                  'Cost & latency data',
                  'Top recommendation with explanation',
                  'Shareable link',
                  'PDF export',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-success" />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#cta" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ember px-6 py-3.5 text-base font-semibold text-white hover:bg-orange-600 transition-colors">
                Run a Benchmark <ArrowRight size={18} />
              </a>
            </div>
            <p className="mt-6 text-center text-sm text-text-muted">
              Coming soon: $19/mo for monthly re-benchmarking
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-t border-surface-border">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {[
              { icon: <Shield size={28} />, title: 'Data stays private', desc: 'Prompts deleted after 30 days. We never train on or share your data.' },
              { icon: <Clock size={28} />, title: 'Results in 3 minutes', desc: 'No setup, no CLI, no YAML configs. Just paste and go.' },
              { icon: <DollarSign size={28} />, title: 'Money-back guarantee', desc: 'If we fail to deliver your report, full refund. No questions asked.' },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-raised text-text-secondary">{icon}</div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-surface-border bg-surface/50">
        <div className="mx-auto max-w-[700px] px-4 py-16 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
          <div className="mt-10">
            {FAQS.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section id="cta" className="border-t border-surface-border">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            You're probably overpaying for GPT-4o.
          </h2>
          <p className="mt-4 text-lg text-text-secondary">Let's find out.</p>
          <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ember px-8 py-4 text-lg font-semibold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-ember/20">
            Run a Benchmark — $9.99 <ArrowRight size={20} />
          </a>
          <p className="mt-6 text-sm text-text-muted">20 models · 3 runs each · results in ~3 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-void">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-text-muted">
              <span className="font-semibold text-text-secondary"><span className="text-ember">Model</span>Pick</span> © 2026
            </div>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
              <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
              <a href="#" className="hover:text-text-secondary transition-colors">Twitter</a>
              <a href="#" className="hover:text-text-secondary transition-colors">GitHub</a>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-text-muted">Built by indie devs, for indie devs</p>
        </div>
      </footer>
    </div>
  )
}
