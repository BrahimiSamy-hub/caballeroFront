import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LogoBleu from '../assets/logo bleu.png'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import i18n from '../i18n'

import { useTranslation } from 'react-i18next'

const Nav = ({ selectedLanguage, changeLanguage }) => {
  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem('selectedLanguage')
  //   if (storedLanguage) {
  //     i18n.changeLanguage(storedLanguage)
  //     setSelectedLanguage(storedLanguage)
  //   }
  // }, [])
  const { t } = useTranslation()
  const { openSidebar } = useProductsContext()

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={LogoBleu} alt='BookLanDZ' loading='lazy' />
          </Link>
          {/* <div className='languages'>
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
          </div> */}
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/'>{t('titleNav')}</Link>
            <Link to='/about'>{t('titleNav2')}</Link>
            <Link to='/products'>{t('titleNav3')}</Link>
          </li>
        </ul>

        <CartButtons
          selectedLanguage={selectedLanguage}
          changeLanguage={changeLanguage}
        />
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      margin-top: 45px;
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-9);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
    font-family: BauerBodoni-roman, serif;
  }
  .nav-links a {
    font-weight: bold;
    color: var(--clr-primary-9);
  }
  .cart-btn-wrapper {
    gap: 15px;
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        position: relative;
        display: inline-block;
        overflow: hidden;
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: 0;
          right: 0;
          background: var(--clr-primary-9);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease-out;
        }

        &:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav
