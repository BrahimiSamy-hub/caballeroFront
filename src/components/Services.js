import React from 'react'
import styled from 'styled-components'
// import { services } from '../utils/constants'
import { useTranslation } from 'react-i18next'
// import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Services = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <div className='section-center'>
        <article className='header'>
          <div className='title'>
            <h3 className=''>{t('serviceH')}</h3>
            <div className='underline2'></div>
          </div>

          {/* <p>{t('serviceP')}</p> */}
        </article>
        <div className='services-center'>
          {/* {services.map((service) => {
            const { id, icon, title, text } = service
            return (
              <article key={id} className='service'>
                <span className='icon'>{icon}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            )
          })} */}

          <article className='service'>
            <a
              href='https://www.facebook.com/caballero.parfumerie?mibextid=ZbWKwL'
              target='_blank'
            >
              <span className='icon'>
                <FaFacebook />
              </span>
              <h4>{t('servicesH1')}</h4>
            </a>

            {/* <p>{t('servicesP1')}</p> */}
          </article>
          <article className='service'>
            <a
              href='https://www.instagram.com/caballero.parfumerie/'
              target='_blank'
            >
              <span className='icon'>
                <FaInstagram />
              </span>{' '}
              <h4>{t('servicesH2')}</h4>
            </a>

            {/* <p>{t('servicesP2')}</p> */}
          </article>
          <article className='service'>
            <a
              href='https://www.tiktok.com/@caballero.parfumerie?_t=8hbnsoidjqw&_r=1'
              target='_blank'
            >
              <span className='icon'>
                <FaTiktok />
              </span>
              <h4>{t('servicesH3')}</h4>
            </a>

            {/* <p>{t('servicesP3')}</p> */}
          </article>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h3,
  h4 {
    color: #eaded7;
  }
  padding: 5rem 0;

  background: var(--clr-primary-9);

  .header h3 {
    margin-bottom: 2rem;
    text-align: center;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;

    color: var(--clr-primary-10);
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: var(--clr-primary-9);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-10);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }

  /* @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  } */
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`
export default Services
