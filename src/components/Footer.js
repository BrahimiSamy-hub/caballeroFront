import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <h5>&copy;{new Date().getFullYear()}</h5>
      <h5>{t('footer')}</h5>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin-top: 2.2rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-primary-9);
  text-align: center;
  span {
    color: var(--clr-primary-10);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer
