import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import QuotesSection from './components/QuotesSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen animated-gradient text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <QuotesSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
