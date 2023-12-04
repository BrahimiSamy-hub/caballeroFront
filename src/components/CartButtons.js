import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import i18n from '../i18n'
import { useTranslation } from 'react-i18next'
import '../../node_modules/flag-icons/css/flag-icons.min.css'

const CartButtons = () => {
  const { t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('selectedLanguage') || 'en'
  )

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    localStorage.setItem('selectedLanguage', language) // Store the selected language in local storage
    setSelectedLanguage(language)
  }
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage')
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage)
      setSelectedLanguage(storedLanguage)
    }
  }, [])
  const { closeSidebar } = useProductsContext()
  const { total_items } = useCartContext()
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link onClick={closeSidebar} to='/cart' className='cart-btn'>
        {t('cart')}
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      <div className='languages'>
        <span
          className={`fi ${
            selectedLanguage === 'en'
              ? 'fi-gb'
              : selectedLanguage === 'ar'
              ? 'fi-dz'
              : 'fi-fr'
          }`}
        ></span>
        <select
          value={selectedLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className='language'
        >
          <option value='en'>{t('language1')}</option>
          <option value='fr'>{t('language2')}</option>
          <option value='ar'>{t('language3')}</option>
        </select>
      </div>
      {/* <button type='button' className='auth-btn'>
        Login <FaUserPlus />
      </button> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .languages {
    /* margin-left: 25px; */
  }
  .language {
    border-radius: var(--radius);
    border: none;
  }
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 10px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-9);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
