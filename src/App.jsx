import { useEffect, useRef, useState } from 'react'

const A = '/assets/'

const Arrow = ({ down = false }) => <span className={`arrow ${down ? 'down' : ''}`} aria-hidden="true">↗</span>

function Button({ href = '#contact', light = false, children }) {
  return <a className={`button ${light ? 'button-light' : ''}`} href={href}><span>{children}</span><Arrow /></a>
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

function Navigation() {
  const [open, setOpen] = useState(false)
  const links = [['Home','#home'],['About','#about'],['Services','#services']]
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])
  return <>
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="UTOMIC home"><span className="brand-mark">U</span>UTOMIC</a>
      <div className="nav-position">AI SYSTEMS &amp; MODERN WEB APPS</div>
      <div className="nav-actions">
        <button className="menu-button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
          <span>{open ? 'Close' : 'Menu'}</span><i /><i />
        </button>
        <Button href="#contact">Get in touch</Button>
      </div>
    </header>
    <div id="site-menu" className={`menu-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="menu-links">{links.map(([label,href], i) => <a key={label} href={href} onClick={() => setOpen(false)}><span>0{i+1}</span>{label}<Arrow /></a>)}</div>
      <div className="menu-meta"><p>Intelligent systems.<br/>Thoughtful interfaces.</p><a href="mailto:sheehansheehan120@gmail.com">sheehansheehan120@gmail.com</a></div>
    </div>
  </>
}

function Hero() {
  return <section id="home" className="hero">
    <div className="hero-grain" />
    <img className="hero-head" src={`${A}P4BoyuwkljLUDId9rVUDZ9kew6I.png`} alt="Futuristic blue cognitive AI profile" />
    <div className="hero-inner">
      <p className="hero-copy">Empowering businesses through intelligent automation and scalable AI-driven digital systems.</p>
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
      <Reveal className="section-heading split-heading"><div><SectionTitle>Selected systems</SectionTitle><h2>Digital capabilities built for meaningful impact.</h2></div><div className="carousel-nav"><button onClick={()=>move(-1)} aria-label="Previous system">←</button><button onClick={()=>move(1)} aria-label="Next system">→</button></div></Reveal>
    </div>
    <div ref={track} className="system-track">
      {systems.map((s,i)=><article className="system-card" key={s.title}>
        <div className="system-image"><img src={`${A}${s.image}`} alt="" /></div>
        <div className="card-bottom"><div><small>0{i+1}</small><h3>{s.title}</h3></div><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div></div>
      </article>)}
    </div>
  </section>
}

const services = [
  ['AI SYSTEMS','Intelligent digital systems designed around workflows, automation and real-world requirements.','6wWRCcU3VjlzD2dkWLPzdbfz9BQ.png'],
  ['AI AUTOMATION','Automation designed to streamline repetitive operations and connect digital processes.','dmqISwkotUlhWWyvkcFf1EOLV0.png'],
  ['MODERN WEB APPS','Fast, responsive and carefully engineered modern applications.','HpbwlnpjZg88PM4uK0b2CHxL9jk.png'],
  ['PREMIUM WEBSITES','High-end websites combining strong design with modern development.','uWFHVnjUxXKK0XK3Rc93uITdeI.png'],
  ['DIGITAL EXPERIENCES','Interactive experiences combining motion, design and technology.','ehEebUs6jiu23RcHeOuctgKml1M.png'],
  ['CUSTOM DIGITAL SYSTEMS','Purpose-built solutions for unique digital requirements.','o4idiEzQppVbon8o49vXpYI8Wpk.png']
]

function Services() {
  return <section id="services" className="section dark-section services">
    <div className="container">
      <Reveal className="section-heading split-heading"><div><SectionTitle light>What we do</SectionTitle><h2>Smart systems for digital growth.</h2></div><p>From intelligent workflows to premium interfaces, every system is shaped around clarity, usefulness and scale.</p></Reveal>
      <div className="service-list">{services.map((s,i)=><article className="service-row" key={s[0]}>
        <span className="service-number">0{i+1}</span><h3>{s[0]}</h3><p>{s[1]}</p><div className="service-thumb"><img src={`${A}${s[2]}`} alt="" /></div><Arrow />
      </article>)}</div>
    </div>
  </section>
}

const SearchIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="21" cy="21" r="12"/><path d="m30 30 11 11"/></svg>
const CodeIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m17 13-10 11 10 11M31 13l10 11-10 11M28 7l-8 34"/></svg>
const GrowthIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 39V28h7v11M20 39V20h7v19M32 39V10h7v29M6 39h36"/></svg>

function WorkCard({ number, title, icon, items, details }) {
  const [expanded, setExpanded] = useState(false)
  const detailId = `work-${title.toLowerCase()}-details`
  return <article id={`work-${title.toLowerCase()}`} className={`work-card work-card-${number}`}>
    <div className="work-card-top"><span>{number}</span><div className="work-card-icon">{icon}</div></div>
    <h3>{title}</h3>
    <div className="work-card-line"/>
    <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
    <button type="button" className="work-card-toggle" aria-label={`${expanded ? 'Hide' : 'Show'} ${title.toLowerCase()} details`} aria-expanded={expanded} aria-controls={detailId} onClick={() => setExpanded(value => !value)}><Arrow/></button>
    <div id={detailId} className={`work-card-details ${expanded ? 'is-open' : ''}`} aria-hidden={!expanded}><div>{details.map(detail => <span key={detail}>{detail}</span>)}</div></div>
  </article>
}

function WorkPortal() {
  return <div className="work-portal" role="img" aria-label="UTOMIC ideas to impact visual">
    <svg className="portal-orbits" viewBox="0 0 520 720" aria-hidden="true"><ellipse cx="255" cy="310" rx="212" ry="94"/><ellipse cx="255" cy="310" rx="250" ry="126" transform="rotate(63 255 310)"/><path d="M24 515C92 155 385 32 494 304"/></svg>
    <div className="portal-halo" aria-hidden="true"/>
    <div className="portal-monolith">
      <strong>UTOMIC</strong>
      <span>IDEAS<br/>SYSTEMS<br/>AUTOMATION<br/>GROWTH</span>
      <i aria-hidden="true"/>
    </div>
    <svg className="portal-terrain" viewBox="0 0 620 370" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="terrainFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#05050b"/><stop offset=".56" stopColor="#171126"/><stop offset="1" stopColor="#08070f"/></linearGradient><linearGradient id="terrainEdge" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#31245f"/><stop offset=".55" stopColor="#c0a1ff"/><stop offset="1" stopColor="#52349c"/></linearGradient></defs>
      <path d="M0 284 44 249 81 260 121 201 157 215 209 137 248 167 289 91 325 151 370 118 421 190 466 166 519 228 559 213 620 259V370H0Z" fill="url(#terrainFill)"/>
      <path d="M0 284 44 249 81 260 121 201 157 215 209 137 248 167 289 91 325 151 370 118 421 190 466 166 519 228 559 213 620 259" fill="none" stroke="url(#terrainEdge)" strokeWidth="2"/>
      <path d="m121 201 86 65 82-175 50 164 82-65 45 121M209 137l39 30 41-76M370 118l51 72 45-24" fill="none" stroke="rgba(154,122,226,.18)"/>
    </svg>
    <div className="portal-reflection" aria-hidden="true"/>
  </div>
}

const workSteps = [
  { number:'01', title:'DISCOVER', icon:<SearchIcon/>, items:['Requirements analysis','Workflow discovery','Goals and opportunities'], details:['Requirements mapping','Workflow review','Opportunity planning'] },
  { number:'02', title:'DESIGN', icon:<LayersIcon/>, items:['UX / UI design','System architecture','AI strategy'], details:['Interface direction','System architecture','AI workflow planning'] },
  { number:'03', title:'BUILD', icon:<CodeIcon/>, items:['AI integration','Modern web development','Testing and deployment'], details:['Development','Integrations','Testing'] },
  { number:'04', title:'EVOLVE', icon:<GrowthIcon/>, items:['Performance optimization','Feature expansion','Ongoing support'], details:['Optimization','Feature expansion','Long-term improvement'] }
]

function Pricing() {
  return <section id="how-we-work" className="section how-we-work dark-section">
    <div className="container">
      <Reveal className="how-work-inner">
        <div className="how-work-intro">
          <div className="how-work-label"><i/>HOW WE WORK</div>
          <h2><span>From ideas</span><span>to <em>real impact.</em></span></h2>
          <p>A clear, focused process for turning your<br className="desktop-break"/> requirements into intelligent, scalable<br className="desktop-break"/> digital products.</p>
        </div>
        <WorkPortal/>
        <div className="work-card-grid">{workSteps.map(step => <WorkCard key={step.number} {...step}/>)}</div>
        <div className="work-detail"><i/><p>IDEAS<br/>SYSTEMS<br/>REAL IMPACT</p></div>
        <div className="work-flow" aria-label="Workflow: Idea to Design to Build to Evolve"><span>IDEA</span><b>→</b><span>DESIGN</span><b>→</b><span>BUILD</span><b>→</b><span>EVOLVE</span></div>
      </Reveal>
    </div>
  </section>
}

function Why() {
  return <section className="section facts light-section">
    <div className="container">
      <Reveal className="section-heading split-heading"><div><SectionTitle>Why choose us</SectionTitle><h2>Designed to stay useful as your world changes.</h2></div><Button href="#contact">Start a conversation</Button></Reveal>
      <div className="facts-grid">
        <article><b>AI</b><h3>Smarter workflows</h3><p>Systems arranged around the work that actually needs to happen.</p></article>
        <article className="fact-visual"><img src={`${A}pLuUcaj4KkrCFvFJLTXFnuPlFOo.png`} alt="Digital interface visual" /></article>
        <article><b>24/7</b><h3>Responsive experiences</h3><p>Reliable access designed for desktop, tablet and mobile.</p></article>
        <article><b>WEB</b><h3>Scalable digital systems</h3><p>Solid foundations that support continued growth and iteration.</p></article>
      </div>
    </div>
  </section>
}

const controlFeatures = [
  ['REAL-TIME SYSTEM CONTROL','Monitor connected workflows and system states through responsive digital interfaces.'],
  ['SEAMLESS DEVICE ACCESS','Design experiences that work cleanly across desktop, tablet and mobile.'],
  ['UNIFIED DIGITAL INTERFACE','Bring connected tools, automation and information into one organized experience.']
]

function AIControl() {
  return <section className="section control dark-section">
    <div className="container">
      <Reveal><SectionTitle light>Real-time AI control</SectionTitle><div className="control-title"><h2>YOUR INTELLIGENT<br/>DIGITAL CONTROL<br/>SYSTEM</h2><p>Manage connected workflows, digital systems and intelligent tools through one thoughtfully designed interface.</p></div></Reveal>
      <div className="control-layout">
        <div className="dashboard" aria-label="Conceptual UTOMIC control dashboard">
          <div className="dash-head"><span>UTOMIC / CONTROL</span><i>LIVE</i></div>
          <div className="dash-body"><aside><b>Overview</b><span>Systems</span><span>Automation</span><span>Activity</span></aside><main><div className="signal"><i/><i/><i/><i/><i/><i/></div><div className="dash-stats"><span><small>CONNECTED</small><b>06</b></span><span><small>STATUS</small><b>SYNC</b></span></div><div className="dash-lines"><i/><i/><i/><i/></div></main></div>
          <div className="dash-glow" />
        </div>
        <div className="control-features">{controlFeatures.map((f,i)=><article key={f[0]}><span>0{i+1}</span><div><h3>{f[0]}</h3><p>{f[1]}</p></div><Arrow /></article>)}</div>
      </div>
    </div>
  </section>
}

function Approach() {
  const items = [['PRECISION','Every detail should serve a clear purpose.'],['CLARITY','Complex technology made understandable and usable.'],['PERFORMANCE','Fast, responsive systems engineered with care.'],['ADAPTABILITY','A foundation designed to evolve with new requirements.']]
  return <section className="section approach light-section">
    <div className="container"><Reveal><SectionTitle>Our approach</SectionTitle><h2 className="approach-heading">Principles behind every system we shape.</h2></Reveal>
      <div className="approach-grid">{items.map((x,i)=><article key={x[0]}><span>0{i+1}</span><div className="approach-orb"/><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div>
    </div>
  </section>
}

const posts = [
  ['AI SYSTEMS','Designing adaptive AI experiences','How thoughtful interfaces turn complex intelligence into useful everyday systems.','VvXYLjuXjahLhon17evFYZRJs.jpg'],
  ['AI AUTOMATION','Building smarter connected workflows','A practical look at removing friction across repetitive digital operations.','BpAF2774xoJbRQ4ujlnLzGL8k4.jpg'],
  ['WEB PERFORMANCE','Why speed is part of the experience','Modern applications feel better when performance is treated as a design material.','l51U3EbbK6HMdM7pW8qOuQqKo.jpg']
]

function Insights() {
  return <section id="insights" className="section insights light-section"><div className="container">
    <Reveal className="section-heading split-heading"><div><SectionTitle>Insights</SectionTitle><h2>Insights shaping smarter digital growth.</h2></div><p>Original perspectives on AI systems, modern development, product design and creative technology.</p></Reveal>
    <div className="post-grid">{posts.map((p,i)=><article key={p[1]}><div className="post-image"><img src={`${A}${p[3]}`} alt=""/><span>{p[0]}</span></div><div className="post-meta"><small>0{i+1} / UTOMIC NOTE</small><Arrow /></div><h3>{p[1]}</h3><p>{p[2]}</p></article>)}</div>
  </div></section>
}

function Footer() {
  return <footer id="contact" className="footer dark-section">
    <div className="footer-glow"/><div className="container">
      <Reveal className="footer-cta"><SectionTitle light>Start something intelligent</SectionTitle><h2>BUILD WHAT SCALES<br/>BEYOND LIMITS</h2><div><p>Create smarter systems, modern digital experiences and scalable technology designed for long-term growth.</p><Button light href="mailto:sheehansheehan120@gmail.com?subject=Let%27s%20build%20with%20UTOMIC">Let's start today</Button></div></Reveal>
      <div className="footer-main">
        <div><a className="brand brand-footer" href="#home"><span className="brand-mark">U</span>UTOMIC</a><p>AI SYSTEMS &amp; MODERN WEB APPS</p></div>
        <nav>{['Home','About','Services'].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
        <div className="contact-list"><span>GET IN TOUCH</span><a href="mailto:sheehansheehan120@gmail.com">sheehansheehan120@gmail.com</a><a href="https://wa.me/94706610373" target="_blank" rel="noreferrer">070 661 0373</a><a href="https://instagram.com/shehan66629" target="_blank" rel="noreferrer">@shehan66629</a></div>
      </div>
      <div className="footer-word">UTOMIC</div>
      <div className="copyright"><span>© {new Date().getFullYear()} UTOMIC</span><span>AI SYSTEMS &amp; MODERN WEB APPS</span><a href="#home">BACK TO TOP ↑</a></div>
    </div>
  </footer>
}

export default function App() {
  return <><Navigation/><main><Hero/><About/><CapabilityTicker/><Systems/><Services/><Pricing/><Why/><AIControl/><Approach/><Insights/></main><Footer/></>
}
