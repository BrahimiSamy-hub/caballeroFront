import React from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
const HomePage = ({ selectedLanguage }) => {
  return (
    <main>
      <Hero selectedLanguage={selectedLanguage} />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  )
}

export default HomePage
