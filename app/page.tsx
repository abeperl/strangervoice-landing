'use client'

import { useState } from 'react'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=net.strangervoice.app'

const SCREENSHOTS = [
  'https://play-lh.googleusercontent.com/CdG03Ic09BqaJPpWDVLNs8BBxPm7WgxFrvkxZtDtrNot0IKDYXBxCLTRxtjdTpzTMm2UwVIvkFviIxS5nDyN=w526-h296-rw',
  'https://play-lh.googleusercontent.com/20-4IN6YBUka1ovJVO4TV1sl0J8lymj88N9vm0zGeSHaR5h0h5XiTnxKvNeisTJGIwjixlVphx3CRsqc0gsw424=w526-h296-rw',
  'https://play-lh.googleusercontent.com/53a2sVmXSyJQiGkM3FafxNt6BhpLrBjNf_KST_j6v0F1F5q_WRA3ITotGoqvnb5hjaEqckeIIHe9Oea-axTg=w526-h296-rw',
  'https://play-lh.googleusercontent.com/x1f8HiPd4-UytGGO3lDG5SeokmuSpE7aME2kHf-nX_jWXgILLxGE-Sicoi0ViWzUag4lUROybhEjA9LUWMt1eQ=w526-h296-rw',
]

const FEATURES = [
  {
    icon: '🌍',
    title: 'Global Connections',
    desc: 'Match with random people from anywhere in the world',
  },
  {
    icon: '⚡',
    title: 'Instant Matching',
    desc: 'Tap to connect and start talking within seconds',
  },
  {
    icon: '🔒',
    title: 'Stay Anonymous',
    desc: 'No personal info required. Your privacy is our priority',
  },
  {
    icon: '🎧',
    title: 'Crystal Clear Voice',
    desc: "High-quality WebRTC voice. Talk like you're in the same room",
  },
  {
    icon: '🆓',
    title: 'Free to Use',
    desc: 'Enjoy daily free conversations. Upgrade for unlimited',
  },
  {
    icon: '🛡️',
    title: 'Safe & Moderated',
    desc: 'Report & block users. Moderation team active 24/7',
  },
]

const STEPS = [
  {
    num: '1',
    title: 'Download',
    desc: 'Get StrangerVoice free from Google Play',
  },
  {
    num: '2',
    title: 'Tap Connect',
    desc: 'Press one button to join the matching queue',
  },
  {
    num: '3',
    title: 'Start Talking',
    desc: 'Get matched instantly and start your conversation',
  },
]

const PREMIUM_FEATURES = [
  'Unlimited daily calls',
  'Priority matching',
  'Skip queue during peak times',
  'Ad-free experience',
  'Premium support',
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing_page' }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
          }}
        >
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem' }}>🎙️</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #ff7043, #e94560)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              StrangerVoice
            </span>
          </a>

          {/* Desktop nav */}
          <div
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: '2rem' }}
          >
            <a href="#features" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >Features</a>
            <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >How It Works</a>
            <a href="#premium" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >Premium</a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #e94560, #7c3aed)',
                color: 'white',
                padding: '0.5rem 1.25rem',
                borderRadius: '2rem',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                boxShadow: '0 2px 12px rgba(233,69,96,0.35)',
              }}
            >
              Download Free
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: 'rgba(26, 26, 46, 0.98)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <a href="#features" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>How It Works</a>
            <a href="#premium" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>Premium</a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #e94560, #7c3aed)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                fontWeight: 700,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Download Free
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: '5rem',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '-10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(79,195,247,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '4rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Text */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(233,69,96,0.15)',
              border: '1px solid rgba(233,69,96,0.3)',
              borderRadius: '2rem',
              padding: '0.4rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: '#e94560',
              fontWeight: 600,
            }}>
              🔥 #1 Anonymous Voice Chat App
            </div>

            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'white',
              }}
            >
              Talk to Strangers.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #e94560, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Make Real Connections.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '500px',
              }}
            >
              Connect with interesting people worldwide through anonymous voice chat.
              One tap. Instant match. Real conversations.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                📱 Download on Google Play
              </a>
              <a href="#how-it-works" className="btn-secondary">
                ✨ See How It Works
              </a>
            </div>

            {/* Stat badges */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { icon: '🌍', label: 'Global Users' },
                { icon: '⚡', label: 'Instant Match' },
                { icon: '🔒', label: '100% Anonymous' },
              ].map((b) => (
                <div
                  key={b.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '2rem',
                    padding: '0.4rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                position: 'relative',
                maxWidth: '280px',
                width: '100%',
              }}
            >
              <div className="phone-frame">
                {/* Phone notch */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '20px',
                  background: '#0f3460',
                  borderRadius: '10px',
                  zIndex: 10,
                }} />
                <img
                  src={SCREENSHOTS[0]}
                  alt="StrangerVoice active call"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>

              {/* Floating decoration */}
              <div style={{
                position: 'absolute',
                top: '-1rem',
                right: '-2rem',
                background: 'linear-gradient(135deg, #e94560, #7c3aed)',
                borderRadius: '1rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 8px 32px rgba(233,69,96,0.4)',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}>
                🔴 Live Now
              </div>
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '-2rem',
                background: 'rgba(79,195,247,0.15)',
                border: '1px solid rgba(79,195,247,0.3)',
                borderRadius: '1rem',
                padding: '0.75rem 1rem',
                backdropFilter: 'blur(12px)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#4fc3f7',
              }}>
                ⚡ Matched instantly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section id="features" style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                marginBottom: '1rem',
              }}
            >
              Everything You Need to{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4fc3f7, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Connect
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
              Built for real connections with privacy and safety at the core.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass-card feature-card"
                style={{
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  lineHeight: 1,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ─────────────────────────────────── */}
      <section
        id="screenshots"
        style={{
          padding: '6rem 1.5rem',
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                marginBottom: '1rem',
              }}
            >
              See StrangerVoice{' '}
              <span style={{
                background: 'linear-gradient(135deg, #e94560, #ff7043)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                in Action
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
              Real screenshots from the app. No filters, no mockups.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {SCREENSHOTS.map((src, i) => (
              <div
                key={i}
                className="screenshot-card"
                style={{
                  transition: 'all 0.35s ease',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                >
                  {/* mini phone chrome */}
                  <div style={{
                    background: 'rgba(26,26,46,0.9)',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e94560' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff7043' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4fc3f7' }} />
                  </div>
                  <img
                    src={src}
                    alt={`StrangerVoice screenshot ${i + 1}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                marginBottom: '1rem',
              }}
            >
              How It{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4fc3f7, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Works
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
              Start talking to someone new in under 10 seconds
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="glass-card"
                style={{
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div className="step-number">{step.num}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>

                {/* Arrow between steps */}
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden md:block"
                    style={{
                      position: 'absolute',
                      right: '-1.25rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '1.5rem',
                      color: 'rgba(255,255,255,0.3)',
                      zIndex: 1,
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              📱 Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* ── PREMIUM ─────────────────────────────────────── */}
      <section
        id="premium"
        style={{
          padding: '6rem 1.5rem',
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div
            className="gradient-border"
            style={{
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}>💎</div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 900,
                marginBottom: '0.75rem',
              }}
            >
              Go Premium
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '2.5rem',
              fontSize: '1.05rem',
            }}>
              Unlock the full StrangerVoice experience
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2.5rem',
              textAlign: 'left',
              display: 'inline-block',
            }}>
              {PREMIUM_FEATURES.map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  <span style={{
                    color: '#4fc3f7',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ justifyContent: 'center' }}
            >
              💎 Upgrade in App
            </a>
          </div>
        </div>
      </section>

      {/* ── EMAIL WAITLIST ───────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div
            className="glass-card"
            style={{ padding: '3.5rem 2.5rem' }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
              }}
            >
              Join the Beta Waitlist
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '2rem',
              fontSize: '1.05rem',
            }}>
              {"Be first to get access. We'll add you as a tester on Google Play."}
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(79,195,247,0.1)',
                  border: '1px solid rgba(79,195,247,0.3)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#4fc3f7',
                }}
              >
                {"You're on the list! 🎉 We'll add you as a tester soon."}
              </div>
            ) : (
              <>
                {errorMsg && (
                  <div
                    style={{
                      background: 'rgba(233,69,96,0.12)',
                      border: '1px solid rgba(233,69,96,0.35)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1.25rem',
                      marginBottom: '1rem',
                      fontSize: '0.95rem',
                      color: '#e94560',
                      fontWeight: 600,
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      flex: 1,
                      minWidth: '200px',
                      padding: '0.875rem 1.25rem',
                      borderRadius: '2rem',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'rgba(255,255,255,0.07)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                    style={{
                      border: 'none',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    {isLoading ? 'Joining…' : 'Join Waitlist'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '3rem 1.5rem',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.75rem' }}>🎙️</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  background: 'linear-gradient(135deg, #ff7043, #e94560)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                StrangerVoice
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
              Talk to strangers. Make real connections.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Privacy Policy
            </a>
            <a href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Terms of Service
            </a>
            <a href="mailto:developer@strangervoice.net" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Support
            </a>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            © 2026 StrangerVoice. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
