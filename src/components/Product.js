import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Product = ({
  image1,
  image2,
  name,
  createdAt,
  inStock,
  prices = [],
  _id,
  sexe,
  season,
  descriptions = [],
}) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const isNewProduct = () => {
    const today = new Date()
    const created = new Date(createdAt)
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1))
    return created > oneMonthAgo
  }

  return (
    <Wrapper>
      <div
        className='container center'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/products/${_id}`}>
          {isNewProduct() && (
            <span className='blinking-text new-badge  '>NEW</span>
          )}
          <div className='image-container'>
            <img
              src={image1.url}
              alt={name}
              crossOrigin='anonymous'
              className={!isHovered ? 'active' : ''}
            />
            <img
              src={image2.url}
              alt={name}
              crossOrigin='anonymous'
              className={isHovered ? 'active' : ''}
            />
          </div>
        </Link>
      </div>
      <footer className='center margin'>
        <Link className='linkV' to={`/products/${_id}`}>
          <h5>{name}</h5>

          {inStock ? (
            <h5 style={{ color: 'green', fontSize: '0.75em' }}>
              {t('inStock')}
            </h5>
          ) : (
            <h5 style={{ color: 'red', fontSize: '0.75em' }}>
              {t('!inStock')}
            </h5>
          )}
        </Link>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .price {
    font-size: 1.15rem;
  }
  @keyframes blink {
    0% {
      color: red;
    }
    50% {
      color: transparent;
    }
    100% {
      color: red;
    }
  }

  .blinking-text {
    animation: blink 1.7s linear infinite;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.9rem;
    z-index: 10;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .linkV:visited {
    color: var(--clr-primary-9);
  }
  .container {
    position: relative;
    border-radius: var(--radius);
  }
  .image-container {
    position: relative;
    width: 250px;
    height: 380px;
  }
  /* @media (min-width: 1170px) {
    img {
      width: 100%;
    }
  } */
  /* img {
    width: 250px;
    height: 380px;
    width: 100%; 
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  } */
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius);
    transition: opacity 300ms ease;
    opacity: 0;
  }
  img.active {
    opacity: 1;
  }
  .container {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
  }

  .image-container {
    position: relative;
    width: 250px;
    height: 380px;
    border-radius: var(--radius);
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius);
    transition: opacity 1s ease;
    opacity: 0;
  }

  img.active {
    opacity: 1;
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    /* opacity: 0.5; */
    transition: opacity 1s ease, visibility 1s ease;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: block;
    //hna kant flex
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p,
  footer small {
    margin-bottom: 0;
    font-weight: 750;
    text-align: center;
  }

  footer p {
    color: var(--clr-primary-9);
    letter-spacing: var(--spacing);
  }
  @media screen and (max-width: 844px) {
    .center {
      margin: auto;
      width: 50%;
    }
    footer h5 {
      margin-top: 1rem;
    }
  }
`
export default Product
