import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { useTranslation } from 'react-i18next'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  BuyNow,
  PageHero,
} from '../components'
import { TbPerfume } from 'react-icons/tb'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = ({ selectedLanguage }) => {
  const { t } = useTranslation()
  const [selectedVolumeType, setSelectedVolumeType] = useState('')
  const translateSexe = (sexe) => {
    switch (sexe) {
      case 'Men':
        return t('men')
      case 'Women':
        return t('woman')
      case 'Unisex':
        return t('unisex')

      default:
        return sexe
    }
  }
  const translateSeason = (season) => {
    switch (season) {
      case 'Winter':
        return t('winter')
      case 'Spring':
        return t('spring')
      case 'Summer':
        return t('summer')
      case 'Autumn':
        return t('autumn')
      default:
        return season
    }
  }
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

  const getDescription = (language) => {
    const desc = descriptions.find(
      (desc) => desc.language === language.toUpperCase()
    )
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
    image2,
    descriptions = [],
    inStock,
    prices = [],
    marque,
  } = product
  const selectedPrice = selectedVolumeType
    ? prices.find((p) => p.type === selectedVolumeType)
    : { price: 0 }
  const imageUrl = image1 ? image1.url : ''
  const imageUrl2 = image2 ? image2.url : ''
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <div className='centered-section'>
          <section className='content'>
            <Link to={`/products`} className='centered-btn btn hero-btn'>
              {t('bToProduct')}
            </Link>
            <h1 className='marginTop'>{name}</h1>
            <h2 className=''>{marque}</h2>
            <div className='fontW'>
              <span
                className='singleLineInfo'
                style={{ color: inStock ? 'green' : 'red' }}
              >
                {inStock ? t('inStock') : t('!inStock')}
              </span>
            </div>
            <div className='product-images-container'>
              <ProductImages image1={imageUrl} image2={imageUrl2} />
            </div>
            <div className='radio-inputs-container radio-inputs'>
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
                    <span className='radio-icon'>
                      <TbPerfume size={25} color='#1d4851' />
                    </span>
                    <span className='radio-text'>{item.type}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className='info-container'>
              <div className='info'>
                <ul>
                  <li>
                    <span>{translateSexe(sexe)}</span>
                  </li>
                  <li>
                    <span>{translateSeason(season)}</span>
                  </li>
                </ul>
              </div>
              <div className='description'>
                <p>{getDescription(selectedLanguage)}</p>
              </div>
            </div>
            <div className='price'>
              {selectedPrice && (
                <span className='price-item'>
                  {/* {t('Price')} :{selectedPrice.price} {t('Currency')} */}
                  {selectedPrice.price} {t('Currency')}
                </span>
              )}
            </div>
            <BuyNow
              image1={image1}
              product={product}
              isInStock={inStock}
              selectedPrice={selectedPrice}
              selectedVolumeType={selectedVolumeType}
            />
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
  .info-container {
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .radio-inputs-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .radio-inputs {
    display: flex;
  }
  .product-images-container {
    background-color: var(--clr-primary-10);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
  }
  .marginTop {
    margin-top: 50px;
  }
  .fontW {
    font-weight: bold;
    margin-top: 12px;
    font-size: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .description {
    font-size: 2rem;
  }
  .singleLineInfo {
    text-transform: capitalize;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--clr-primary-9);
    span {
      font-weight: 700;
    }
  }
  .centered-section {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .radio-inputs > * {
    margin: 6px;
  }

  .radio-input:checked + .radio-tile {
    border-color: var(--clr-primary-9);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: var(--clr-primary-9);
  }

  .radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: var(--clr-primary-9);
    border-color: var(--clr-primary-9);
  }

  .radio-input:checked + .radio-tile .radio-label {
    color: var(--clr-primary-9);
  }

  .radio-input:focus + .radio-tile {
    border-color: var(--clr-primary-9);
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
    border: 2px solid white;
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
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    max-width: 100%;
    font-size: 4rem;
    min-height: 5rem;
  }

  .radio-tile:hover {
    border-color: #1d4851;
  }

  .radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
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
    font-size: 3rem;
  }

  input[type='radio'] {
    margin-right: 10px;
  }
  .centered-btn {
    display: inline-block;
  }
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    font-size: 2.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-weight: 700;
    }
    ul {
      padding: 0;
      list-style: none;
      text-align: center;
    }
    li {
      margin-bottom: 10px; /* Adjust as needed */
    }
  }
  .hero-btn {
    padding: 0.75rem 1.5rem;
    font-size: 2rem;
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
