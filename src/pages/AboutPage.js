import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
// import aboutImg from '../assets/bouteille-parfum.jpg'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation()
  return (
    <main>
      <PageHero title={t('heroAbout')} />
      <Wrapper className='page section section-center'>
        {/* <img src={aboutImg} alt='aboutImg' loading='lazy' />
         */}
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.3234085215827!2d6.170701476423837!3d35.54571417263126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f4119ddc51bda7%3A0x139fc644d71af4e5!2sCaballero%20Parfumerie!5e0!3m2!1sfr!2sdz!4v1700934151797!5m2!1sfr!2sdz'
          title='localisation'
          width='600'
          height='450'
          allowfullscreen=''
          loading='lazy'
          referrerpolicy='no-referrer-when-downgrade'
        ></iframe>
        <article className=''>
          <div className='title'>
            <h2>{t('aboutH')}</h2>
            <div className='underline'></div>
          </div>
          <p>{t('aboutP')}</p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  min-height: 750px;
  gap: 4rem;
  iframe {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  /* img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  } */
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-primary-9);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
