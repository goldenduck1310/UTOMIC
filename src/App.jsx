import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { siteConfig } from './siteConfig.js'

const A = '/assets/'

const Arrow = ({ down = false }) => <span className={`arrow ${down ? 'down' : ''}`} aria-hidden="true">↗</span>
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r="1"/></svg>
const WhatsAppIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z"/><path d="M8.2 7.8c.3-.7.7-.7 1-.7h.3c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.8c-.2.2-.2.4-.1.6.5 1.2 1.5 2.2 2.7 2.8.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l2 .9c.3.1.4.3.4.5 0 .3-.2 1.3-.7 1.8-.5.6-1.3.9-2.1.8-1.1-.1-2.6-.6-4.4-2.2-2.2-1.9-3.5-4.4-3.6-5.6 0-.6.2-1.1.5-1.4Z"/></svg>
const EmailIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>

function ProjectButton({ onClick, light = false, className = '', children = 'START A PROJECT' }) {
  return <button type="button" className={`button ${light ? 'button-light' : ''} ${className}`} onClick={onClick}><span>{children}</span><Arrow /></button>
}

function SectionTitle({ children, light = false }) {
  return <div className={`eyebrow ${light ? 'light' : ''}`}><i />{children}</div>
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el) }
    }, { threshold: .12 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function Navigation({ onStartProject }) {
  return <>
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="UTOMIC home"><span className="brand-mark">U</span>UTOMIC</a>
      <div className="nav-position">AI SYSTEMS &amp; MODERN WEB APPS</div>
      <div className="nav-actions">
        <ProjectButton className="nav-project" onClick={event => onStartProject(null, event.currentTarget)}/>
      </div>
    </header>
  </>
}

function Hero({ onStartProject }) {
  return <section id="home" className="hero">
    <div className="hero-grain" />
    <img className="hero-head" src={`${A}P4BoyuwkljLUDId9rVUDZ9kew6I.png`} alt="Futuristic blue cognitive AI profile" fetchPriority="high" decoding="async" />
    <div className="hero-inner">
      <div className="hero-message">
        <p className="hero-copy">We design and build intelligent AI systems, modern web apps and digital experiences.</p>
        <div className="hero-actions">
          <ProjectButton light className="hero-project" onClick={event => onStartProject(null, event.currentTarget)}/>
          <a href="#services" className="hero-services">EXPLORE SERVICES <Arrow /></a>
        </div>
      </div>
      <a href="#systems" className="glass-card">
        <p>Explore the systems and digital capabilities we build.</p>
        <div><strong>AI + WEB</strong><Arrow /></div>
      </a>
      <h1 aria-label="Cognitive">COGNITIVE</h1>
    </div>
    <a className="scroll-cue" href="#about"><span>Scroll to explore</span><Arrow down /></a>
  </section>
}

const AtomIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="24" rx="19" ry="8"/><ellipse cx="24" cy="24" rx="19" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="19" ry="8" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3"/></svg>
const LayersIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 6 17 10-17 10L7 16 24 6Z"/><path d="m7 24 17 10 17-10"/><path d="m7 32 17 10 17-10"/></svg>
const NetworkIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="5"/><circle cx="24" cy="6" r="3"/><circle cx="24" cy="42" r="3"/><circle cx="6" cy="24" r="3"/><circle cx="42" cy="24" r="3"/><circle cx="11" cy="11" r="3"/><circle cx="37" cy="37" r="3"/><path d="M24 19V9m0 30V29M19 24H9m30 0H29M20.5 20.5 13 13m14.5 14.5L35 35"/></svg>
const StackIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 5 19 10-19 10L5 15 24 5Z"/><path d="m5 23 19 10 19-10"/><path d="m5 31 19 10 19-10"/></svg>
const BoltIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M28 3 10 27h13l-3 18 18-25H25l3-17Z"/></svg>

function CapabilityCard({ id, icon, title, description, tags, details, className = '' }) {
  const [expanded, setExpanded] = useState(false)
  return <article className={`utomic-capability-card ${className}`}>
    <div className="utomic-card-icon">{icon}</div>
    <div className="utomic-card-copy">
      <h3><span>{title[0]}</span><span>{title[1]}</span></h3>
      <p>{description}</p>
    </div>
    <button className="utomic-card-toggle" type="button" aria-label={`${expanded ? 'Hide' : 'Show'} ${title.join(' ')} capabilities`} aria-expanded={expanded} aria-controls={`${id}-details`} onClick={() => setExpanded(value => !value)}><Arrow /></button>
    <div id={`${id}-details`} className={`utomic-card-details ${expanded ? 'is-open' : ''}`} aria-hidden={!expanded}>
      <div>{details.map(item => <span key={item}>{item}</span>)}</div>
    </div>
    <div className="utomic-card-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
  </article>
}

function VideoModal({ open, onClose, triggerRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll('button, video, [href], [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      videoRef.current?.pause()
      triggerRef.current?.focus()
    }
  }, [open, onClose, triggerRef])

  if (!open) return null
  return <div className="video-modal" role="presentation" onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="video-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="overview-title" ref={dialogRef}>
      <div className="video-modal-top"><h2 id="overview-title">UTOMIC overview</h2><button ref={closeRef} type="button" onClick={onClose} aria-label="Close overview video">Close <span aria-hidden="true">×</span></button></div>
      <video ref={videoRef} src={`${A}utomic-overview.mp4`} controls playsInline preload="metadata">Your browser does not support HTML5 video.</video>
    </div>
  </div>
}

function About() {
  const [videoOpen, setVideoOpen] = useState(false)
  const watchRef = useRef(null)
  return <>
    <section id="about" className="section light-section about">
      <div className="container">
        <Reveal className="utomic-about-shell">
          <div className="utomic-about-main">
            <div className="utomic-about-copy">
              <div className="utomic-about-label">AI SYSTEMS &amp; MODERN WEB APPS</div>
              <h2><span>We design AI systems</span><span>for scalable <em>digital experiences.</em></span></h2>
              <p>Intelligent systems, thoughtful interfaces and modern<br className="desktop-break"/> applications designed around real workflows.</p>
              <div className="utomic-about-actions">
                <button ref={watchRef} className="watch-overview" type="button" onClick={() => setVideoOpen(true)}><i aria-hidden="true">▶</i><span>Watch overview</span></button>
                <a className="explore-services" href="#services"><span>Explore services</span><b aria-hidden="true">→</b></a>
              </div>
            </div>
            <div className="utomic-about-visual" aria-label="UTOMIC AI and modern web capabilities">
              <div className="utomic-liquid-art" aria-hidden="true">
                <i className="liquid liquid-one"/><i className="liquid liquid-two"/><i className="liquid liquid-three"/><i className="liquid liquid-four"/>
                <svg className="utomic-orbits" viewBox="0 0 760 650"><ellipse cx="380" cy="325" rx="335" ry="150"/><ellipse cx="380" cy="325" rx="300" ry="210" transform="rotate(-24 380 325)"/><path d="M63 424C168 181 516 76 704 283"/></svg>
              </div>
              <div className="utomic-capability-cards">
                <CapabilityCard id="ai-systems" className="ai-card" icon={<AtomIcon/>} title={['AI','Systems']} description="Intelligence designed around real workflows, useful interfaces and long-term adaptability." tags={['AI Automation','Intelligent Workflows','AI Integrations']} details={['AI Automation','Workflow Intelligence','AI Integrations']}/>
                <CapabilityCard id="modern-web-apps" className="web-card" icon={<LayersIcon/>} title={['Modern','Web Apps']} description="Modern applications and premium digital experiences built for clarity, speed and scalability." tags={['Web Applications','Digital Experiences','Responsive Systems']} details={['Responsive Development','Modern Interfaces','Scalable Architecture']}/>
              </div>
            </div>
          </div>
          <div className="utomic-bottom-capabilities">
            <article><NetworkIcon/><div><strong>AI Automation</strong><span>Smarter workflows</span></div></article>
            <article><StackIcon/><div><strong>Modern Web Apps</strong><span>Scalable experiences</span></div></article>
            <article><BoltIcon/><div><strong>Future Ready</strong><span>Built for what’s next</span></div></article>
          </div>
        </Reveal>
      </div>
    </section>
    <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} triggerRef={watchRef}/>
  </>
}

function CapabilityTicker() {
  const items = ['AI SYSTEMS','AUTOMATION','WEB APPS','INTERFACES','DIGITAL EXPERIENCES']
  return <div className="ticker" aria-label="UTOMIC capabilities"><div>{[...items,...items].map((x,i)=><span key={i}>{x}<b>✦</b></span>)}</div></div>
}

const systems = [
  { title:'AI Automation', tags:['WORKFLOWS','INTEGRATION'], image:'HpbwlnpjZg88PM4uK0b2CHxL9jk.png' },
  { title:'Modern Web Apps', tags:['PRODUCT','ENGINEERING'], image:'ehEebUs6jiu23RcHeOuctgKml1M.png' },
  { title:'Intelligent Interfaces', tags:['UI / UX','REAL-TIME'], image:'6QCDzPRDYBli8N8AZ4OVFlkOk.png' }
]

function Systems() {
  const track = useRef(null)
  const move = dir => track.current?.scrollBy({left: dir * Math.min(track.current.clientWidth * .78, 980), behavior:'smooth'})
  return <section id="systems" className="section systems light-section">
    <div className="container">
      <Reveal className="section-heading split-heading"><div><SectionTitle>Selected systems</SectionTitle><h2>Digital capabilities built for meaningful impact.</h2></div><div className="carousel-nav"><button type="button" onClick={()=>move(-1)} aria-label="Previous system">←</button><button type="button" onClick={()=>move(1)} aria-label="Next system">→</button></div></Reveal>
    </div>
    <div ref={track} className="system-track">
      {systems.map((s,i)=><article className="system-card" key={s.title}>
        <div className="system-image"><img src={`${A}${s.image}`} alt="" loading="lazy" decoding="async" /></div>
        <div className="card-bottom"><div><small>0{i+1}</small><h3>{s.title}</h3></div><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div></div>
      </article>)}
    </div>
  </section>
}

const services = [
  ['AI SYSTEMS','Custom AI tools, assistants, knowledge systems and intelligent dashboards shaped around real business workflows.','6wWRCcU3VjlzD2dkWLPzdbfz9BQ.png'],
  ['AI AUTOMATION','Workflow automation, lead processing, content operations and connected business integrations.','dmqISwkotUlhWWyvkcFf1EOLV0.png'],
  ['MODERN WEB APPS','Fast, scalable dashboards, client portals, SaaS interfaces and production web applications.','HpbwlnpjZg88PM4uK0b2CHxL9jk.png'],
  ['PREMIUM WEBSITES','High-quality agency, product and business websites built for brand, performance and conversion.','uWFHVnjUxXKK0XK3Rc93uITdeI.png'],
  ['DIGITAL EXPERIENCES','Interactive storytelling, motion-driven interfaces and immersive product experiences.','ehEebUs6jiu23RcHeOuctgKml1M.png'],
  ['CUSTOM DIGITAL SYSTEMS','Purpose-built digital systems for requirements that do not fit standard software templates.','o4idiEzQppVbon8o49vXpYI8Wpk.png']
]

const projectOptions = [
  { id:'ai-systems', title:'AI SYSTEM', description:'Custom AI tools and intelligent systems.' },
  { id:'modern-web-apps', title:'MODERN WEB APP', description:'Scalable products, portals and interfaces.' },
  { id:'premium-websites', title:'PREMIUM WEBSITE', description:'High-quality brand and business websites.' },
  { id:'ai-automation', title:'AI AUTOMATION', description:'Connected, intelligent business workflows.' },
  { id:'digital-experiences', title:'DIGITAL EXPERIENCE', description:'Interactive, motion-led web experiences.' },
  { id:'custom-digital-systems', title:'CUSTOM DIGITAL SYSTEM', description:'Purpose-built systems for unique requirements.' }
]

const serviceProjectMap = {
  'AI SYSTEMS':'ai-systems',
  'AI AUTOMATION':'ai-automation',
  'MODERN WEB APPS':'modern-web-apps',
  'PREMIUM WEBSITES':'premium-websites',
  'DIGITAL EXPERIENCES':'digital-experiences',
  'CUSTOM DIGITAL SYSTEMS':'custom-digital-systems'
}

const { contact } = siteConfig
const whatsappNumber = contact.whatsappNumber
const projectScopes = ['SMALL PROJECT','GROWTH PROJECT','LARGE / CUSTOM PROJECT','NOT SURE YET']

function ProjectEnquiry({ initialService, onClose, triggerRef }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const stepHeadingRef = useRef(null)
  const scrollPositionRef = useRef(0)
  const sendingRef = useRef(false)
  const [selectedProject, setSelectedProject] = useState(initialService || '')
  const [step, setStep] = useState(initialService ? 2 : 1)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ projectName:'', description:'', goal:'', scope:'', name:'', email:'', phone:'', companyWebsite:'' })
  const selectedOption = projectOptions.find(option => option.id === selectedProject)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    scrollPositionRef.current = window.scrollY
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = event => {
      if (event.key === 'Escape' && !sendingRef.current) { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll('button, input, select, textarea, [href]')].filter(element => !element.disabled)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      window.scrollTo(0, scrollPositionRef.current)
      triggerRef.current?.focus()
    }
  }, [onClose, triggerRef])

  useEffect(() => {
    if (step > 1) stepHeadingRef.current?.focus()
  }, [step])

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const whatsappHref = () => {
    const message = `Hi UTOMIC, I'd like to discuss a project.${selectedOption ? `\n\nProject area: ${selectedOption.title}` : ''}${form.name ? `\nName: ${form.name}` : ''}`
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  const selectProject = project => {
    setSelectedProject(project)
    setError('')
    setStatus('idle')
  }

  const validateStep = currentStep => {
    if (currentStep === 1 && !selectedProject) return 'Choose the service that best matches your project.'
    if (currentStep === 2 && (form.projectName.trim().length < 2 || form.description.trim().length < 20 || form.goal.trim().length < 10)) return 'Add the project name, a clear description and the primary goal.'
    if (currentStep === 3 && !form.scope) return 'Choose the most suitable project scope.'
    if (currentStep === 4 && (form.name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))) return 'Enter your name and a valid email address.'
    return ''
  }

  const moveStep = direction => {
    if (direction > 0) {
      const validationError = validateStep(step)
      if (validationError) { setStatus('validation-error'); setError(validationError); return }
    }
    setError('')
    setStatus('idle')
    setStep(current => Math.min(5, Math.max(1, current + direction)))
  }

  const submit = async event => {
    event.preventDefault()
    const validationError = [1,2,3,4].map(validateStep).find(Boolean)
    if (validationError || !selectedOption) { setStatus('validation-error'); setError(validationError || 'Choose a project type.'); return }
    sendingRef.current = true
    setSending(true)
    setStatus('submitting')
    setError('')
    try {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 15000)
      const response = await fetch('/api/project-enquiry', { method:'POST', signal:controller.signal, headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ ...form, projectType:selectedOption.title }) }).finally(() => window.clearTimeout(timeout))
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.error || 'We couldn’t send your enquiry. Please try again.')
      setStatus('success')
    } catch (submissionError) {
      setStatus('server-error')
      setError(submissionError.name === 'AbortError' ? 'The request timed out. Please check your connection and try again.' : (submissionError.message || 'We couldn’t send your enquiry. Please try again.'))
    } finally {
      sendingRef.current = false
      setSending(false)
    }
  }

  return createPortal(<div className="enquiry-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && !sending) onClose() }}>
    <section className="enquiry-panel" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" ref={panelRef}>
      <button ref={closeRef} type="button" className="enquiry-close" onClick={onClose} aria-label="Close project enquiry" disabled={sending}>×</button>
      <div className="enquiry-intro">
        <span className="enquiry-label">START A PROJECT</span>
        <h2 id="enquiry-title">{status === 'success' ? 'PROJECT RECEIVED.' : <>WHAT DO YOU WANT<br/>TO BUILD?</>}</h2>
        <p>Tell us about what you're building and what you need. Choose the area that best matches your project.</p>
        <div className="enquiry-contact" aria-label="Contact UTOMIC directly">
          <strong>START A PROJECT</strong>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Open UTOMIC on Instagram"><InstagramIcon/><span>{contact.instagramHandle}</span></a>
          <a href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20UTOMIC%2C%20I%27d%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noopener noreferrer" aria-label="Chat with UTOMIC on WhatsApp"><WhatsAppIcon/><span>{contact.whatsappDisplay}</span></a>
          <a href={`mailto:${contact.email}`} aria-label="Email UTOMIC"><EmailIcon/><span>{contact.email}</span></a>
        </div>
      </div>
      <div className="enquiry-builder">
        {status === 'success' ? <div className="enquiry-success" role="status" aria-live="polite"><span>DELIVERY CONFIRMED</span><p>Thanks for reaching out. Your project enquiry has been received.</p><a className="enquiry-whatsapp" href={whatsappHref()} target="_blank" rel="noopener noreferrer">CONTINUE ON WHATSAPP <Arrow /></a><button type="button" className="enquiry-close-action" onClick={onClose}>CLOSE</button></div> : <>
          <div className="enquiry-progress" aria-label={`Project enquiry step ${step} of 5`}>{[1,2,3,4,5].map(number => <span key={number} className={number <= step ? 'is-active' : ''}>{number}</span>)}</div>
          <form className="enquiry-form enquiry-steps" onSubmit={submit} noValidate>
            {step === 1 && <div className="enquiry-step"><h3 ref={stepHeadingRef} tabIndex="-1">WHAT DO YOU WANT TO BUILD?</h3><fieldset className="project-options"><legend className="sr-only">Choose a project area</legend>{projectOptions.map((option, index) => <button key={option.id} type="button" className={`project-option ${selectedProject === option.id ? 'is-selected' : ''}`} aria-pressed={selectedProject === option.id} onClick={() => selectProject(option.id)} disabled={sending}><span>0{index + 1}</span><div><strong>{option.title}</strong><p>{option.description}</p></div><i aria-hidden="true">✓</i></button>)}</fieldset></div>}
            {step === 2 && <div className="enquiry-step"><h3 ref={stepHeadingRef} tabIndex="-1">TELL US ABOUT THE PROJECT</h3><label>PROJECT / COMPANY NAME *<input name="projectName" autoComplete="organization" value={form.projectName} onChange={update} minLength="2" maxLength="160" required/></label><label>PROJECT DESCRIPTION *<textarea name="description" rows="5" value={form.description} onChange={update} minLength="20" maxLength="5000" required placeholder="What do you want to build, and what should it do?"/></label><label>PRIMARY GOAL *<textarea name="goal" rows="3" value={form.goal} onChange={update} minLength="10" maxLength="1500" required placeholder="What outcome should this project create?"/></label><label className="enquiry-honeypot" aria-hidden="true">LEAVE THIS FIELD EMPTY<input name="companyWebsite" value={form.companyWebsite} onChange={update} tabIndex="-1" autoComplete="off"/></label></div>}
            {step === 3 && <div className="enquiry-step"><h3 ref={stepHeadingRef} tabIndex="-1">PROJECT SCOPE</h3><fieldset className="scope-options"><legend className="sr-only">Choose a project scope</legend>{projectScopes.map(scope => <label key={scope} className={form.scope === scope ? 'is-selected' : ''}><input type="radio" name="scope" value={scope} checked={form.scope === scope} onChange={update}/><span>{scope}</span><i aria-hidden="true">✓</i></label>)}</fieldset></div>}
            {step === 4 && <div className="enquiry-step"><h3 ref={stepHeadingRef} tabIndex="-1">HOW CAN WE REACH YOU?</h3><label>NAME *<input name="name" autoComplete="name" value={form.name} onChange={update} minLength="2" maxLength="120" required/></label><label>EMAIL *<input name="email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={update} maxLength="254" required/></label><label>WHATSAPP / PHONE — OPTIONAL<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} maxLength="80"/></label></div>}
            {step === 5 && <div className="enquiry-step enquiry-review"><h3 ref={stepHeadingRef} tabIndex="-1">REVIEW YOUR ENQUIRY</h3><dl><div><dt>SERVICE</dt><dd>{selectedOption?.title}</dd></div><div><dt>PROJECT</dt><dd>{form.projectName}</dd></div><div><dt>DESCRIPTION</dt><dd>{form.description}</dd></div><div><dt>PRIMARY GOAL</dt><dd>{form.goal}</dd></div><div><dt>SCOPE</dt><dd>{form.scope}</dd></div><div><dt>CONTACT</dt><dd>{form.name}<br/>{form.email}{form.phone && <><br/>{form.phone}</>}</dd></div></dl></div>}
            {error && <p className="enquiry-error" role="alert" aria-live="assertive">{error}</p>}
            <div className="enquiry-step-actions">{step > 1 && <button type="button" className="enquiry-back" onClick={() => moveStep(-1)} disabled={sending}>BACK</button>}{step < 5 ? <button type="button" className="enquiry-next" onClick={() => moveStep(1)}>CONTINUE <Arrow /></button> : <button className="enquiry-submit" type="submit" disabled={sending}>{sending ? 'SENDING…' : status === 'server-error' ? 'RETRY PROJECT ENQUIRY' : 'SEND PROJECT ENQUIRY'} <Arrow /></button>}</div>
          </form>
        </>}
      </div>
    </section>
  </div>, document.body)
}

function Services({ onStartProject }) {
  const openServiceEnquiry = event => {
    const service = serviceProjectMap[event.currentTarget.dataset.service]
    if (!service) return
    onStartProject(service, event.currentTarget)
  }
  return <section id="services" className="section dark-section services">
    <div className="container">
      <Reveal className="section-heading split-heading"><div><SectionTitle light>What we do</SectionTitle><h2>Smart systems for digital growth.</h2></div><p>From intelligent workflows to premium interfaces, every system is shaped around clarity, usefulness and scale.</p></Reveal>
      <div className="service-list">{services.map((s,i) => {
        return <article className="service-row service-row-enquiry" key={s[0]}>
          <button type="button" className="service-row-button" data-service={s[0]} onClick={openServiceEnquiry} aria-label={`Start a ${s[0].toLowerCase()} project enquiry`}>
            <span className="service-number">0{i+1}</span><span className="service-title">{s[0]}</span><span className="service-description">{s[1]}</span><span className="service-thumb"><img src={`${A}${s[2]}`} alt="" loading="lazy" decoding="async" /></span><Arrow /><span className="service-start">START A PROJECT <Arrow /></span>
          </button>
        </article>
      })}</div>
    </div>
  </section>
}

function DigitalExperiencesMotion({ onStartProject }) {
  const [showClosingBrand, setShowClosingBrand] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const video = videoRef.current
    if (!video || !('IntersectionObserver' in window)) { setVideoReady(true); return }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVideoReady(true); observer.disconnect() }
    }, { rootMargin:'450px 0px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const syncClosingBrand = event => {
    const { currentTime, duration } = event.currentTarget
    const shouldShow = Number.isFinite(duration) && duration - currentTime <= 2.35
    setShowClosingBrand(current => current === shouldShow ? current : shouldShow)
  }

  return <section id="motion-experiences" className="section motion-experience dark-section">
    <div className="motion-experience-grid" aria-hidden="true"/>
    <div className="motion-experience-aura motion-aura-left" aria-hidden="true"/>
    <div className="motion-experience-aura motion-aura-right" aria-hidden="true"/>
    <div className="container">
      <Reveal className="motion-experience-heading">
        <div className="motion-experience-label"><i/>DIGITAL EXPERIENCES</div>
        <h2><span>WE BUILD</span><span>WHAT <em>MOVES.</em></span></h2>
        <p>UTOMIC creates intelligent digital systems, modern web experiences and interactive products designed to feel seamless, immersive and memorable.</p>
      </Reveal>

      <Reveal className="motion-showcase">
        <div className="motion-showcase-rail" aria-hidden="true"><span>UTOMIC / MOTION-LED EXPERIENCE</span><span>01 — 01</span></div>
        <div className="motion-stage">
          <div className="motion-stage-orbits" aria-hidden="true"><i/><i/><i/></div>
          <div className="motion-stage-mark motion-stage-mark-left" aria-hidden="true">INTELLIGENT<br/>DIGITAL<br/>SYSTEMS</div>
          <div className="motion-video-wrap">
            <video ref={videoRef} autoPlay={!reducedMotion} muted loop playsInline preload={videoReady ? 'metadata' : 'none'} onTimeUpdate={syncClosingBrand} aria-label="UTOMIC digital experiences motion showcase">
              {videoReady && <source src={`${A}utomic-digital-experiences-final.mp4`} type="video/mp4"/>}
            </video>
            <div className={`motion-closing-brand ${showClosingBrand ? 'is-visible' : ''}`} aria-hidden={!showClosingBrand}>
              <strong>UTOMIC</strong><span>AI SYSTEMS &amp; MODERN WEB APPS</span>
            </div>
          </div>
          <div className="motion-stage-mark motion-stage-mark-right" aria-hidden="true">AI-POWERED<br/>MOTION-LED<br/>EXPERIENCES</div>
        </div>
      </Reveal>

      <Reveal className="motion-capabilities" aria-label="UTOMIC digital capabilities">
        <button type="button" className="motion-capability-trigger" onClick={event => onStartProject('ai-systems', event.currentTarget)}>AI SYSTEMS <b aria-hidden="true">START A PROJECT ↗</b></button><i aria-hidden="true"/><button type="button" className="motion-capability-trigger" onClick={event => onStartProject('modern-web-apps', event.currentTarget)}>MODERN WEB APPS <b aria-hidden="true">START A PROJECT ↗</b></button><i aria-hidden="true"/><button type="button" className="motion-capability-trigger" onClick={event => onStartProject('digital-experiences', event.currentTarget)}>DIGITAL EXPERIENCES <b aria-hidden="true">START A PROJECT ↗</b></button>
      </Reveal>
    </div>
  </section>
}

const posts = [
  ['AI SYSTEMS','Designing adaptive AI experiences','How thoughtful interfaces turn complex intelligence into useful everyday systems.','VvXYLjuXjahLhon17evFYZRJs.jpg','ai-systems'],
  ['AI AUTOMATION','Building smarter connected workflows','A practical look at removing friction across repetitive digital operations.','BpAF2774xoJbRQ4ujlnLzGL8k4.jpg','ai-systems'],
  ['WEB PERFORMANCE','Why speed is part of the experience','Modern applications feel better when performance is treated as a design material.','l51U3EbbK6HMdM7pW8qOuQqKo.jpg','modern-web-apps']
]

function Insights({ onStartProject }) {
  return <section id="insights" className="section insights light-section"><div className="container">
    <Reveal className="section-heading split-heading"><div><SectionTitle>Insights</SectionTitle><h2>Insights shaping smarter digital growth.</h2></div><p>Original perspectives on AI systems, modern development, product design and creative technology.</p></Reveal>
    <div className="post-grid">{posts.map((p,i)=><button type="button" className="post-card" key={p[1]} onClick={event => onStartProject(p[4], event.currentTarget)} aria-label={`${p[1]} — start a related project`}><div className="post-image"><img src={`${A}${p[3]}`} alt="" loading="lazy" decoding="async"/><span>{p[0]}</span></div><div className="post-meta"><small>0{i+1} / UTOMIC NOTE</small><Arrow /></div><h3>{p[1]}</h3><p>{p[2]}</p></button>)}</div>
  </div></section>
}

function Footer({ onStartProject }) {
  return <footer id="contact" className="footer dark-section">
    <div className="footer-glow"/><div className="container">
      <Reveal className="footer-cta"><SectionTitle light>Start something intelligent</SectionTitle><h2>BUILD WHAT SCALES<br/>BEYOND LIMITS</h2><div><p>Create smarter systems, modern digital experiences and scalable technology designed for long-term growth.</p><ProjectButton light className="footer-project" onClick={event => onStartProject(null, event.currentTarget)}/></div></Reveal>
      <div className="footer-main">
        <div><a className="brand brand-footer" href="#home"><span className="brand-mark">U</span>UTOMIC</a><p>AI SYSTEMS &amp; MODERN WEB APPS</p></div>
        <nav aria-label="Footer navigation">{['Home','About','Services','Insights','Contact'].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
        <div className="contact-list"><span>START A PROJECT</span><a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer"><InstagramIcon/>{contact.instagramHandle}</a><a href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20UTOMIC%2C%20I%27d%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/>{contact.whatsappDisplay}</a><a href={`mailto:${contact.email}`}><EmailIcon/>{contact.email}</a></div>
      </div>
      <div className="footer-word">UTOMIC</div>
      <div className="copyright"><span>© {new Date().getFullYear()} UTOMIC</span><span>AI SYSTEMS &amp; MODERN WEB APPS</span><span className="legal-links"><a href="/privacy.html">PRIVACY</a><a href="/terms.html">TERMS</a></span><a href="#home">BACK TO TOP ↑</a></div>
    </div>
  </footer>
}

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [initialService, setInitialService] = useState(null)
  const enquiryTriggerRef = useRef(null)
  const openProjectEnquiry = (service, trigger) => {
    enquiryTriggerRef.current = trigger
    setInitialService(service)
    setEnquiryOpen(true)
  }
  const closeProjectEnquiry = () => setEnquiryOpen(false)
  return <><Navigation onStartProject={openProjectEnquiry}/><main><Hero onStartProject={openProjectEnquiry}/><About/><CapabilityTicker/><Systems/><Services onStartProject={openProjectEnquiry}/><DigitalExperiencesMotion onStartProject={openProjectEnquiry}/><Insights onStartProject={openProjectEnquiry}/></main><Footer onStartProject={openProjectEnquiry}/>{enquiryOpen && <ProjectEnquiry initialService={initialService} onClose={closeProjectEnquiry} triggerRef={enquiryTriggerRef}/>}</>
}
