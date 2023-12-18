import { React, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
import { useTranslation } from 'react-i18next'

const CartPage = () => {
  const { t } = useTranslation()
  const [hasReloaded, setHasReloaded] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true')
      window.location.reload()
    } else {
      sessionStorage.removeItem('reloaded')
    }
  }, [])
  const { cart } = useCartContext()
  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>{t('EmptyCart')}</h2>
          <Link to='/products' className='btn'>
            {t('BtnEmpty')}
          </Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <main>
      <PageHero title={t('heroCart')} />
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
