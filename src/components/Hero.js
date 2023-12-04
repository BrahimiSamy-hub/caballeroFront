import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBcg from '../assets/single.webp'
import heroBcg2 from '../assets/multiple.webp'
import smallheroBcg from '../assets/small-single.png'
import smallheroBcg2 from '../assets/multiple-single.png'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  const [mainImageLoaded, setMainImageLoaded] = useState(false)
  const [accentImageLoaded, setAccentImageLoaded] = useState(false)

  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>{t('title')}</h1>

        <p>{t('description')}</p>

        <Link to='products' className='btn hero-btn'>
          {t('shopButton')}
        </Link>
      </article>
      <article className='img-container'>
        <div
          className={`main-img blur-load ${mainImageLoaded ? 'loaded' : ''}`}
          style={{ backgroundImage: `url(${smallheroBcg})` }}
        >
          <img
            src={heroBcg}
            alt='Main'
            className='main-img'
            loading='lazy'
            onLoad={() => setMainImageLoaded(true)}
            onError={(e) => {
              e.target.src = '../assets/single.png'
            }}
          />
        </div>
        <div
          className={`blur-load ${accentImageLoaded ? 'loaded' : ''}`}
          style={{ backgroundImage: `url(${smallheroBcg2})` }}
        >
          <img
            src={heroBcg2}
            alt='Accent'
            className='accent-img'
            loading='lazy'
            onLoad={() => setAccentImageLoaded(true)}
            onError={(e) => {
              e.target.src = '../assets/single.png '
            }}
          />
        </div>
      </article>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  .blur-load {
    background-size: cover;
    background-position: center;
  }
  .blur-load.loaded > img {
    opacity: 1;
  }
  .blur-load::before {
    content: '';
    position: absolute;
    inset: 0;
    animation: pulse 2.5s infinite;
  }
  @keyframes pulse {
    0% {
      background-color: rgba(255, 255, 255, 0);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.1);
    }
    100% {
      background-color: rgba(255, 255, 255, 0);
    }
  }

  .blur-load::before {
    content: none;
  }
  .blur-load > img {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
      object-position: center;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero
