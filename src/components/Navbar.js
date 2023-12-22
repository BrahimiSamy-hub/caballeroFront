import React from 'react'
import styled from 'styled-components'
import LogoBleu from '../assets/logo bleu.png'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'

import { useTranslation } from 'react-i18next'

const Nav = ({ selectedLanguage, changeLanguage }) => {
  const { t } = useTranslation()
  const { openSidebar } = useProductsContext()

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={LogoBleu} alt='BookLanDZ' loading='lazy' />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        {/* <ul className='nav-links'>
          <li>
            <Link to='/'>{t('titleNav')}</Link>
            <Link to='/about'>{t('titleNav2')}</Link>
            <Link to='/products'>{t('titleNav3')}</Link>
            <Link to='/products'>Homme</Link>
            <Link to='/products'>Femme</Link>
            <Link to='/products'>Packs</Link>
          </li>
        </ul> */}
        <ul className='nav-links'>
          <li>
            <Link to='/'>{t('titleNav')}</Link>
          </li>

          <li>
            <Link to='/about'>{t('titleNav2')}</Link>
          </li>
          <li className='nav-item dropdown'>
            <span className='nav-link'>{t('titleNav3')}</span>
            <div className='dropdown-content'>
              <Link to='/products'>{t('AllProducts')}</Link>
              <Link to='/perfumes'>{t('Perfumes')}</Link>
              <Link to='/body_balms'>{t('Baumes_Corporel')}</Link>
              <Link to='/body_perfumes'>{t('Parfums_De_Corps')}</Link>
              <Link to='/packs'>{t('Packs')}</Link>
            </div>
          </li>
          {/* <li>
            <Link to='/products'>{t('titleNav3')}</Link>
          </li> */}
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
  .nav-links .dropdown {
    position: relative;
    display: inline-block;
  }

  .nav-links .dropdown .nav-link {
    font-weight: bold;
    color: var(--clr-primary-9);
    text-decoration: none;
    position: relative;
    display: inline-block;
    overflow: hidden;
    font-size: 1.1rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.5rem;
    cursor: pointer;
  }

  .nav-links .dropdown .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--clr-primary-10);
    min-width: 300px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
    border-radius: var(--radius);
  }

  .nav-links .dropdown:hover .dropdown-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    position: absolute;
  }

  .nav-links .dropdown .dropdown-content a {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: var(--clr-primary-9);
  }
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
    /* font-family: BauerBodoni-roman, serif; */
  }
  .nav-links a {
    font-weight: bold;
    color: var(--clr-primary-9);
  }
  .cart-btn-wrapper {
    gap: 25px;
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
        margin: 0 0.3rem;
      }
      a {
        position: relative;
        display: inline-block;
        overflow: hidden;
        font-size: 1.1rem;
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
