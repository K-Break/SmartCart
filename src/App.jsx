import { useState, useEffect, useRef } from 'react'

/* ==========================================
   Intersection Observer Hook
   ========================================== */
function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

/* ==========================================
   Animated Section Wrapper
   ========================================== */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useInView()
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ==========================================
   Navbar
   ========================================== */
function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <img src={theme === 'dark' ? "/logo-full-light.png" : "/logo-full-color.png"} alt="SmartCart" />
        </a>
        <div className="navbar-links">
          <a href="#concept">Concept</a>
          <a href="#fonctionnement">Fonctionnement</a>
          <a href="#valeurs">Valeurs</a>
          <a href="#b2b">Entreprises</a>
          <a href="#rse">RSE</a>
          <a href="#contact" className="navbar-cta">Nous contacter</a>
        </div>
        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
          <button className="navbar-mobile-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ==========================================
   Hero Section
   ========================================== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">

          <h1 className="hero-title">
            Révolutionnez vos courses avec le{' '}
            <span className="accent">caddie intelligent</span>
          </h1>
          <p className="hero-description">
            SmartCart remplace les chariots traditionnels par des caddies connectés.
            Suivez vos achats en temps réel, maîtrisez votre budget et dites adieu
            aux files d'attente.
          </p>
          <div className="hero-actions">
            <a href="#concept" className="btn-primary">
              Découvrir le concept →
            </a>
            <a href="#b2b" className="btn-secondary">
              Solution B2B
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-number">0s</div>
              <div className="hero-stat-label">Temps d'attente en caisse</div>
            </div>
            <div>
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Transparence du budget</div>
            </div>
            <div>
              <div className="hero-stat-number">-30%</div>
              <div className="hero-stat-label">Réduction des vols</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   Concept Section
   ========================================== */
function Concept() {
  const cards = [
    {
      title: 'Détection RFID instantanée',
      text: 'Chaque article déposé dans le chariot est instantanément détecté grâce à la technologie RFID et ajouté à votre panier virtuel.',
    },
    {
      title: 'Écran intégré au guidon',
      text: "Un écran tactile permet de suivre en temps réel la liste de vos achats, le prix total et d'accéder à votre carte de fidélité.",
    },
    {
      title: 'Paiement ultra-rapide',
      text: "Fini les caisses ! Rendez-vous à une borne rapide, renseignez le numéro de votre caddie et réglez en quelques secondes.",
    },
    {
      title: 'Maîtrise du budget',
      text: 'Visualisez le montant total de votre panier à tout moment. Plus aucune mauvaise surprise au moment de payer.',
    },
    {
      title: 'Accessibilité pour tous',
      text: "Manipulez chaque produit une seule fois, du rayon au sac. Un atout majeur pour les personnes âgées ou à mobilité réduite.",
    },
    {
      title: 'Sécurité renforcée',
      text: "La détection automatique des articles lutte efficacement contre le vol en magasin, un bénéfice direct pour les enseignes.",
    },
  ]

  return (
    <section className="section concept-section" id="concept">
      <div className="container concept-container">
        <div className="concept-sticky">
          <AnimatedSection>
            <div className="section-header">
              <div className="section-label">Le concept</div>
              <h2 className="section-title">Un caddie qui change tout</h2>
              <p className="section-subtitle">
                SmartCart modernise l'expérience d'achat physique pour la rendre aussi fluide,
                transparente et rapide que le commerce en ligne.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <div className="concept-list">
          {cards.map((card, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="concept-item">
                <div className="concept-item-num">0{i + 1}</div>
                <div className="concept-item-content">
                  <h3 className="concept-item-title">{card.title}</h3>
                  <p className="concept-item-text">{card.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   How It Works Section
   ========================================== */
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Prenez un SmartCart', text: "Prenez un caddie intelligent à l'entrée du magasin. Un tutoriel de 10 secondes s'affiche sur l'écran." },
    { num: '02', title: 'Faites vos courses', text: "Déposez vos articles dans le chariot. Chaque produit est détecté automatiquement et s'affiche à l'écran." },
    { num: '03', title: 'Suivez votre panier', text: 'Consultez en temps réel la liste de vos achats et le montant total directement sur le guidon.' },
    { num: '04', title: 'Payez en un instant', text: "Rendez-vous à une borne de paiement rapide et réglez vos courses en quelques secondes. C'est terminé !" },
  ]

  return (
    <section className="section" id="fonctionnement" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-label">Comment ça marche</div>
            <h2 className="section-title">Simple comme bonjour</h2>
            <p className="section-subtitle">
              Un parcours client sans couture, de l'entrée du magasin au paiement.
            </p>
          </div>
        </AnimatedSection>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="step-card">
                <div className="step-number">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   Values Section
   ========================================== */
function Values() {
  const values = [
    { title: 'Innovation pragmatique', text: "Nous utilisons des technologies fiables et éprouvées comme le RFID pour résoudre un problème concret du quotidien." },
    { title: 'Simplicité', text: "Suppression des files d'attente, fin des manipulations inutiles et paiement instantané. Les courses deviennent fluides." },
    { title: 'Transparence & Confiance', text: "Affichage en temps réel du prix du panier. Sécurisation des transactions et protection des données personnelles." },
    { title: 'Accessibilité pour tous', text: "Réduction de l'effort physique en ne manipulant les articles qu'une seule fois. Un confort pour tous." },
    { title: 'Écoresponsabilité', text: "Dématérialisation des tickets, batteries longue durée et recharge par panneaux solaires sur les parkings." },
    { title: 'Bien-être', text: "Qualité de vie au travail pour nos équipes : télétravail, horaires flexibles, espaces de pause confortables." },
  ]

  return (
    <section className="section" id="valeurs">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-label">Nos valeurs</div>
            <h2 className="section-title">Ce qui nous anime</h2>
            <p className="section-subtitle">
              Six valeurs fondamentales guident chacune de nos décisions et innovations.
            </p>
          </div>
        </AnimatedSection>
        <div className="values-matrix">
          {values.map((v, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="matrix-item">
                <h3 className="matrix-item-title">{v.title}</h3>
                <p className="matrix-item-text">{v.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   B2B Section
   ========================================== */
function B2B() {
  const features = [
    { title: 'Données comportementales', text: "Accédez à des heatmaps montrant les rayons les plus visités et les zones d'arrêt de vos clients." },
    { title: 'Lutte contre le vol', text: "La détection automatique RFID réduit significativement les pertes liées au vol en magasin." },
    { title: "Optimisation de l'espace", text: "Remplacez les longues lignes de caisses par des bornes de paiement rapide compactes." },
    { title: 'Projet pilote gratuit', text: "Testez 20 SmartCarts pendant 2 mois dans votre magasin. Statistiques réelles et résultats concrets." },
  ]

  return (
    <section className="section" id="b2b" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-label">Solution B2B</div>
            <h2 className="section-title">Partenaires enseignes</h2>
            <p className="section-subtitle">
              Une double victoire : optimisation pour les enseignes et satisfaction pour les consommateurs.
            </p>
          </div>
        </AnimatedSection>
        <div className="b2b-layout">
          <AnimatedSection>
            <div className="b2b-content">
              {features.map((f, i) => (
                <div className="b2b-feature" key={i}>
                  <div>
                    <h3 className="b2b-feature-title">{f.title}</h3>
                    <p className="b2b-feature-text">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="b2b-visual">
              <div className="b2b-stat-card">
                <div className="b2b-stat-value accent">-70%</div>
                <div className="b2b-stat-label">Temps d'attente en caisse éliminé</div>
              </div>
              <div className="b2b-stat-card">
                <div className="b2b-stat-value green">+25%</div>
                <div className="b2b-stat-label">Satisfaction client en hausse</div>
              </div>
              <div className="b2b-stat-card">
                <div className="b2b-stat-value cyan">2 mois</div>
                <div className="b2b-stat-label">Projet pilote pour valider les résultats</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   RSE Section
   ========================================== */
function RSE() {
  const items = [
    {
      title: 'Matériaux durables',
      text: "Structure en acier et plastique issus de filières de recyclage certifiées. Chaque composant est conçu pour être démonté et réintégré dans un circuit d'économie circulaire.",
    },
    {
      title: 'Énergie propre',
      text: 'Batteries rechargeables intégrées, alimentées par des panneaux photovoltaïques sur les parkings. Production locale et renouvelable, sans dépendance au réseau.',
    },
    {
      title: 'Accessibilité réelle',
      text: "Interface lisible, hauteur adaptable, grand affichage, fort contraste et retour audio. Un mode assistance alerte automatiquement un employé si besoin.",
    },
  ]

  return (
    <section className="section" id="rse">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-label">Engagement RSE</div>
            <h2 className="section-title">Responsabilité sociale & environnementale</h2>
            <p className="section-subtitle">
              Un produit technologique n'a pas à être synonyme de surconsommation de ressources.
            </p>
          </div>
        </AnimatedSection>
        <div className="rse-minimal-grid">
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="rse-minimal-item">
                <h3 className="rse-minimal-title">{item.title}</h3>
                <p className="rse-minimal-text">{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   Contact Section
   ========================================== */
function Contact() {
  const [formState, setFormState] = useState({
    name: '', email: '', company: '', type: 'b2b', message: ''
  })

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Merci pour votre message ! Nous reviendrons vers vous rapidement.')
    setFormState({ name: '', email: '', company: '', type: 'b2b', message: '' })
  }

  return (
    <section className="section" id="contact" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-label">Contact</div>
            <h2 className="section-title">Parlons de votre projet</h2>
            <p className="section-subtitle">
              Que vous soyez une enseigne intéressée ou un investisseur,
              nous serions ravis d'échanger avec vous.
            </p>
          </div>
        </AnimatedSection>
        <div className="contact-layout">
          <AnimatedSection>
            <div className="contact-info">
              <div className="contact-info-item">
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">contact@smartcart.fr</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div>
                  <div className="contact-info-label">Téléphone</div>
                  <div className="contact-info-value">+33 1 23 45 67 89</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div>
                  <div className="contact-info-label">Adresse</div>
                  <div className="contact-info-value">Paris, France</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div>
                  <div className="contact-info-label">Statut juridique</div>
                  <div className="contact-info-value">SAS — Société par Actions Simplifiée</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Nom complet</label>
                  <input type="text" id="contact-name" name="name" placeholder="Votre nom" required value={formState.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input type="email" id="contact-email" name="email" placeholder="votre@email.com" required value={formState.email} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-company">Entreprise</label>
                  <input type="text" id="contact-company" name="company" placeholder="Votre entreprise" value={formState.company} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-type">Type de demande</label>
                  <select id="contact-type" name="type" value={formState.type} onChange={handleChange}>
                    <option value="b2b">Partenariat B2B</option>
                    <option value="invest">Investissement</option>
                    <option value="media">Presse & Médias</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" placeholder="Décrivez votre projet ou votre demande..." required value={formState.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="form-submit">
                Envoyer le message →
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   Footer
   ========================================== */
function Footer({ theme }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={theme === 'dark' ? "/logo-full-light.png" : "/logo-full-color.png"} alt="SmartCart" />
            <p>
              SmartCart réinvente l'expérience d'achat physique pour la rendre aussi fluide,
              transparente et rapide que le commerce en ligne.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <a href="#concept">Concept</a>
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#valeurs">Valeurs</a>
            <a href="#b2b">Entreprises</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Engagement</h4>
            <a href="#rse">RSE</a>
            <a href="#">Accessibilité</a>
            <a href="#">RGPD</a>
            <a href="#">Mentions légales</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <a href="mailto:contact@smartcart.fr">contact@smartcart.fr</a>
            <a href="tel:+33123456789">+33 1 23 45 67 89</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SmartCart SAS. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  )
}

/* ==========================================
   App
   ========================================== */
function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // initialize theme based on body data-theme attribute if exists, else light
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Concept />
      <HowItWorks />
      <Values />
      <B2B />
      <RSE />
      <Contact />
      <Footer theme={theme} />
    </>
  )
}

export default App
