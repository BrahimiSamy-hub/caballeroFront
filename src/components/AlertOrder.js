import React from 'react'
import styled from 'styled-components'
import { TiTick } from 'react-icons/ti'
import { useTranslation } from 'react-i18next'

const AlertOrder = () => {
  const { t } = useTranslation()
  return (
    <Wrapper className='page'>
      <div className='center containerr'>
        <TiTick size={100} />
        <h4>{t('OrderSub')}</h4>
        <p>{t('Thanks')}</p>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  .containerr {
    max-width: 38em;
    padding: 1em 3em 2em 3em;
    margin: 3em auto;
    background-color: #fff;
    border-radius: 4.2px;
    box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
  }
  .center {
    text-align: center;
  }
`

export default AlertOrder
