import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PageHero = ({ title, product }) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>
          <Link to='/'>{t('titleNav')}</Link>/
          {product && <Link to='/products'>Products /</Link>}
          {title}
        </h3>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-primary-9);
  width: 100%;
  min-height: 15vh;
  display: flex;
  align-items: center;

  color: white;
  a {
    color: var(--clr-primary-6);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: white;
  }
`

export default PageHero
