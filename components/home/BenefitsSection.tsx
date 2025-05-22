'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPackage, FiSun, FiHome, FiHeart } from 'react-icons/fi'

export default function BenefitsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const benefits = [
    {
      icon: <FiPackage size={30} />,
      title: 'Free Shipping',
      description: 'On all orders over $75',
    },
    {
      icon: <FiSun size={30} />,
      title: 'Sustainably Made',
      description: 'Eco-friendly materials and processes',
    },
    {
      icon: <FiHome size={30} />,
      title: '30-Day Returns',
      description: 'Hassle-free return policy',
    },
    {
      icon: <FiHeart size={30} />,
      title: 'Expert Support',
      description: 'Wellness guidance from our team',
    },
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }
  
  return (
    <section className="container-custom py-12" ref={ref}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            className="flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-serif mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}