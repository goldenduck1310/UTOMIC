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
  const links = [['Home','#home'],['About','#about'],['Services','#services'],['Insights','#insights'],['Contact','#contact']]
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
        <Button href="#contact">Contact us</Button>
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

function About() {
  return <section id="about" className="section light-section about">
    <div className="container">
      <Reveal className="section-heading split-heading">
        <div><SectionTitle>Who we are</SectionTitle><h2>We design AI systems that turn complexity into clear, scalable digital experiences.</h2></div>
        <Button href="#services">Explore services</Button>
      </Reveal>
      <div className="about-grid">
        <div className="orbital-metric">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-dot" />
          <span>AI</span>
        </div>
        <div className="about-note">Intelligence designed around real workflows, useful interfaces and long-term adaptability.</div>
        <Reveal className="metric-card"><strong>WEB</strong><p>Modern applications and premium digital experiences.</p></Reveal>
      </div>
    </div>
  </section>
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

function Pricing() {
  return <section className="section pricing light-section">
    <div className="container">
      <Reveal className="section-heading split-heading"><div><SectionTitle>Engagement</SectionTitle><h2>Built around the scope—not a template.</h2></div><p>Every engagement begins with the requirements, constraints and outcome. Clear scope first; a tailored quote follows.</p></Reveal>
      <div className="pricing-grid">
        <article className="price-card price-card-dark"><div className="price-top"><span>01</span><b>Focused build</b></div><h3>CUSTOM<br/>ENGAGEMENT</h3><ul><li>Defined product scope</li><li>AI, automation or web build</li><li>Responsive interface system</li><li>Delivery and handover</li></ul><Button light href="mailto:sheehansheehan120@gmail.com?subject=UTOMIC%20Custom%20Engagement">Discuss the scope</Button></article>
        <article className="price-card price-card-blue"><div className="price-top"><span>02</span><b>Tailored system</b></div><h3>CONTACT<br/>FOR QUOTE</h3><ul><li>Requirements discovery</li><li>Custom architecture</li><li>Scalable implementation</li><li>Ongoing evolution options</li></ul><Button light href="#contact">Start a conversation</Button></article>
      </div>
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
        <nav>{['Home','About','Services','Insights','Contact'].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
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
