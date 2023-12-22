import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const AddToCart = ({
  product,
  isInStock,
  image1,
  selectedPrice,
  selectedVolumeType,
}) => {
  const { t } = useTranslation()
  const { _id, name } = product
  const [amount, setAmount] = useState(1)

  const addToLocalStorage = () => {
    const type = selectedVolumeType
    let cart = localStorage.getItem('cart')
    cart = cart ? JSON.parse(cart) : []
    let found = false
    const newCart = cart.map((item) => {
      if (item._id === _id && item.type === type) {
        found = true
        if (selectedPrice) {
          return {
            ...item,
            amount: item.amount + amount,
            price: selectedPrice.price,
            image: image1,
          }
        }
      }
      return item
    })
    if (!found) {
      if (selectedPrice) {
        newCart.push({
          _id,
          name: name,
          amount,
          price: selectedPrice.price,
          type,
          image: image1,
        })
      }
    }
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  return (
    <Wrapper>
      <div className='btn-container'>
        <Link
          to='/checkout'
          className={`btn btn2 hero-btn ${!isInStock ? 'disabled' : ''}`}
          onClick={addToLocalStorage}
        >
          {t('BuyNow')}
          <div>
            <small className='blinking-text'> {t('CashOnDelivery')}</small>
          </div>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .blinking-text {
    padding: 5px;
    border-radius: 5px;
    font-size: 0.9rem;
    z-index: 10;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: red;
  }
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .hero-btn {
    padding: 0.75rem 1.5rem;
    font-size: 2rem;
  }
  .btn-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
  .btn2 {
    margin-top: 1.5rem;
    background-color: red;
    animation: pulse 1.5s infinite;
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    min-width: 140px;
  }
`
export default AddToCart
