import React from 'react'
// import logoBlanc from '../assets/LogoBlanc.png'
import logobleu from '../assets/logo bleu.png'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext()
  const { t } = useTranslation()

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
              <Link to='/products'>{t('titleNav3')}</Link>
            </Link>
          </li>
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  text-align: center;
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
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 120px;
    width: 150px;
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

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

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
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
