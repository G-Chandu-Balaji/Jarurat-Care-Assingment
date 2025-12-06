import { motion } from 'framer-motion'

const AboutSection = () => {
  const features = [
    {
      icon: '💜',
      title: 'Emotional Support',
      description: 'Connect with trained counselors and support groups who understand your journey.'
    },
    {
      icon: '📚',
      title: 'Education & Resources',
      description: 'Access comprehensive information about prevention, detection, and treatment.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Join a caring community of survivors, caregivers, and advocates.'
    },
    {
      icon: '🔬',
      title: 'Research Updates',
      description: 'Stay informed about the latest breakthroughs in cancer research and medicine.'
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [-50, 50, -50],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
            <span className="text-violet-300 text-sm font-medium">What We Do</span>
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="gradient-text">Mission</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are dedicated to empowering those affected by cancer through education, 
            support, and community. Together, we fight for a cancer-free future.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass rounded-2xl p-6 text-center group hover:purple-glow transition-all duration-300"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-2xl p-8 pink-glow"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Years of Support' },
              { number: '50K+', label: 'Lives Touched' },
              { number: '200+', label: 'Partner Hospitals' },
              { number: '95%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
