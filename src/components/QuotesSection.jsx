import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QuotesSection = () => {
  const [quotes, setQuotes] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fallback inspirational quotes for cancer awareness
  const fallbackQuotes = [
    { text: "You are stronger than you know, braver than you believe, and more loved than you can imagine.", author: "Cancer Survivor" },
    { text: "Cancer may have started the fight, but I will finish it.", author: "Unknown" },
    { text: "Hope is the only thing stronger than fear.", author: "Suzanne Collins" },
    { text: "Every day is a gift. That's why it's called the present.", author: "Unknown" },
    { text: "The human spirit is stronger than anything that can happen to it.", author: "C.C. Scott" },
    { text: "You beat cancer by how you live, why you live, and in the manner in which you live.", author: "Stuart Scott" },
    { text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, I will try again tomorrow.", author: "Mary Anne Radmacher" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" }
  ]

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true)
        // Using the Quotable API for inspirational quotes
        const response = await fetch('https://api.quotable.io/quotes/random?limit=8&tags=inspirational')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        const formattedQuotes = data.map(q => ({ text: q.content, author: q.author }))
        setQuotes(formattedQuotes.length > 0 ? formattedQuotes : fallbackQuotes)
      } catch (err) {
        console.log('Using fallback quotes:', err)
        setQuotes(fallbackQuotes)
        setError(null) // Don't show error, just use fallback
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuotes()
  }, [])

  // Auto-rotate quotes
  useEffect(() => {
    if (quotes.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [quotes])

  const currentQuote = quotes[currentIndex]

  return (
    <section id="quotes" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="text-purple-300 text-sm font-medium">Words of Strength</span>
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Inspirational </span>
            <span className="gradient-text">Quotes</span>
          </h2>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 sm:p-12 pink-glow relative overflow-hidden"
        >
          {/* Decorative quote marks */}
          <div className="absolute top-4 left-4 text-8xl text-purple-500/10 font-serif">"</div>
          <div className="absolute bottom-4 right-4 text-8xl text-pink-500/10 font-serif rotate-180">"</div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
              />
              <p className="text-gray-400 mt-4">Loading inspirational quotes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light leading-relaxed mb-6">
                  "{currentQuote?.text}"
                </p>
                <p className="text-purple-400 font-semibold text-lg">
                  — {currentQuote?.author}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Quote navigation dots */}
          {!isLoading && quotes.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {quotes.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Refresh button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <motion.button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % quotes.length)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 glass rounded-full text-purple-300 hover:text-white transition-colors"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-lg"
            >
              ↻
            </motion.span>
            Next Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default QuotesSection
