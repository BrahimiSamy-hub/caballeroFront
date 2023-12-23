import React, { useState } from 'react'
import logobleu from '../assets/logo bleu.png'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useTranslation } from 'react-i18next'

const Sidebar = ({ selectedLanguage, changeLanguage }) => {
  const { isSidebarOpen, closeSidebar } = useProductsContext()
  const { t } = useTranslation()

  const handleDropdownToggle = (event) => {
    event.preventDefault()
    const dropdownContent =
      event.currentTarget.querySelector('.dropdown-content')

    if (dropdownContent) {
      dropdownContent.style.display =
        dropdownContent.style.display === 'block' ? 'none' : 'block'
    }
  }
  const stopPropagation = (event) => {
    event.stopPropagation()
    closeSidebar()
  }

  return (
    <SidebarContainer>
      <aside
        className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
      >
        <div className='sidebar-header'>
          <Link to='/'>
            <img
              src={logobleu}
              alt='Caballero'
              className='logo'
              onClick={closeSidebar}
              loading='lazy'
            />
          </Link>
          <button type='button' className='close-btn' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className='links'>
          <li>
            <Link onClick={closeSidebar} to='/'>
              <Link to='/'>{t('titleNav')}</Link>
              <Link to='/about'>{t('titleNav2')}</Link>
            </Link>
            {/* <Link to='/products'>{t('titleNav3')}</Link>
             */}
            <div className='dropdown' onClick={handleDropdownToggle}>
              <span className='dropdown-main'>{t('titleNav3')}</span>
              <div className='dropdown-content'>
                <Link to='/products' onClick={stopPropagation}>
                  {t('AllProducts')}{' '}
                </Link>
                <Link to='/perfumes' onClick={stopPropagation}>
                  {t('Perfumes')}
                </Link>
                <Link to='/body_balms' onClick={stopPropagation}>
                  {t('Baumes_Corporel')}
                </Link>
                <Link to='/body_perfumes' onClick={stopPropagation}>
                  {t('Parfums_De_Corps')}
                </Link>
                <Link to='/packs' onClick={stopPropagation}>
                  {t('Packs')}
                </Link>
              </div>
            </div>
          </li>
        </ul>
        <CartButtons
          selectedLanguage={selectedLanguage}
          changeLanguage={changeLanguage}
        />
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  /* text-align: center; */
  .links .dropdown {
    position: relative;
    display: inline-block;
  }

  .links .dropdown .dropdown-main {
    /* display: block; */
    /* text-align: left; */
    margin-left: 22px;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
    cursor: pointer;
  }
  .links .dropdown .dropdown-main::after {
    content: '▼'; /* Use your preferred dropdown icon or character */
    position: absolute;
    margin-left: 22px;

    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 0.7rem;
    color: var(--clr-grey-3);
  }
  .links .dropdown .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--clr-white);
    min-width: 220px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
    border-radius: var(--radius);
    text-align: left;
  }

  /* .links .dropdown:hover .dropdown-content {
    display: block;
  } */

  .links .dropdown .dropdown-content a {
    display: block;
    text-align: center; /* Center the text horizontally */
    padding: 0.5rem 0;
    text-decoration: none;
    color: var(--clr-grey-3);
    transition: var(--transition);
  }
  /* 
  .links .dropdown .dropdown-content a:hover {
    color: var(--clr-grey-2);
  } */
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  /* .close-btn:hover {
    color: var(--clr-red-light);
  } */
  .logo {
    justify-self: center;
    height: 110px;
    width: 170px;
  }
  .links {
    font-family: BauerBodoni-roman, serif;
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }
  /* 
  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  } */

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
    gap: 30px;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
