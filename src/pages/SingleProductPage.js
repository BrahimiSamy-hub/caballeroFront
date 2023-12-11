import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'

import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const [selectedVolumeType, setSelectedVolumeType] = useState('')
  const [currentLanguage, setCurrentLanguage] = useState('')

  const { id } = useParams()
  const history = useHistory()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext()

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
    console.log()
  }, [id])
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
  }, [error])
  useEffect(() => {
    if (product && product.prices && product.prices.length > 0) {
      setSelectedVolumeType(product.prices[0].type)
    }
  }, [product])
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('selectedLanguage') || 'en' // Fallback to 'en' if not set
    setCurrentLanguage(preferredLanguage)
    console.log('Preferred Language from Local Storage:', preferredLanguage)
  }, [currentLanguage])
  const getDescription = (language) => {
    console.log('Current Language:', language) // Check the current language
    console.log('Descriptions:', descriptions) // Check the descriptions array

    const desc = descriptions.find((desc) => desc.language === language)
    return desc ? desc.text : 'No description available'
  }
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const {
    name,
    sexe,
    season,
    image1,
    descriptions = [],
    inStock,
    prices = [],
  } = product
  const selectedPrice = selectedVolumeType
    ? prices.find((p) => p.type === selectedVolumeType)
    : { price: 0 }
  console.log('ds', image1)
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className=' btn hero-btn'>
          back to products
        </Link>
        <div className=''>
          <section className='content'>
            <h2 className=''>{name}</h2>

            <ProductImages image1={image1.url} />
            <div class='radio-inputs'>
              {prices.map((item, index) => (
                <label key={index} className='radio-label'>
                  <input
                    className='radio-input'
                    type='radio'
                    name='volumeType'
                    value={item.type}
                    checked={selectedVolumeType === item.type}
                    onChange={() => setSelectedVolumeType(item.type)}
                  />
                  <span className='radio-tile'>
                    <span className='radio-icon'></span>
                    <span className='radio-text'>{item.type}</span>
                  </span>
                </label>
              ))}
            </div>
            {/* {prices.map((item, index) => (
              <div class='radio-inputs'>
                <label>
                  <input class='radio-input' type='radio' name='engine' />
                  <span class='radio-tile'>
                    <span class='radio-icon'></span>
                    <span class='radio-label'>Bicycle</span>
                  </span>
                </label>
                <label>
                  <input class='radio-input' type='radio' name='engine' />
                  <span class='radio-tile'>
                    <span class='radio-icon'></span>
                    <span class='radio-label'>Car</span>
                  </span>
                </label>
              </div>
            ))} */}
            <div>
              <div className=' '>
                <span>Gender : {sexe}</span>
              </div>
              <div className=' '>
                <span>Season : {season}</span>
              </div>
              <div className=' '>
                <p>{getDescription(currentLanguage)}</p>
              </div>
              <div className=' '>
                <p>
                  Stock :
                  <span style={{ color: inStock ? 'green' : 'red' }}>
                    {inStock ? ' Disponible' : ' Rupture'}
                  </span>
                </p>
              </div>
            </div>
            <div className=' price'>
              {selectedPrice && <span>Price: {selectedPrice.price} DZD</span>}
            </div>
            <AddToCart
              image1={image1}
              product={product}
              isInStock={inStock}
              selectedPrice={selectedPrice}
              selectedVolumeType={selectedVolumeType}
            />
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .radio-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .radio-inputs > * {
    margin: 6px;
  }

  .radio-input:checked + .radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2260ff;
  }

  .radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #2260ff;
    border-color: #2260ff;
  }

  .radio-input:checked + .radio-tile .radio-icon svg {
    fill: #1d4851;
  }

  .radio-input:checked + .radio-tile .radio-label {
    color: #1d4851;
  }

  .radio-input:focus + .radio-tile {
    border-color: #1d4851;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
  }

  .radio-input:focus + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    min-height: 80px;
    border-radius: 0.5rem;
    border: 2px solid #eaded7;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
  }

  .radio-tile:before {
    content: '';
    position: absolute;
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid #1d4851;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
  }

  .radio-tile:hover {
    border-color: #1d4851;
  }

  .radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-icon svg {
    width: 2rem;
    height: 2rem;
    fill: #494949;
  }

  .radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
    font-size: 13px;
  }

  .radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .price-item {
    display: block;
    margin-bottom: 5px;
  }

  input[type='radio'] {
    margin-right: 10px;
  }

  .parent {
    display: flex;
    justify-content: center; /* Aligns horizontally */
    align-items: center; /* Aligns vertically */
    height: 100vh; /* Example height, can be adjusted */
  }
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    font-weight: bold;
    margin-top: 15px;
    color: var(--clr-primary-9);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .hero-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 380px 1fr;
      align-items: center;
    }
    .price {
      font-size: 2rem;
    }
  }
  @media (max-width: 991px) {
    .product-center {
      grid-template-columns: 150px 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
