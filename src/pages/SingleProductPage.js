import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
// import { formatPrice } from "../utils/helpers"
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
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  const { name, price, description, images, stars, reviews } = product
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn hero-btn'>
          back to products
        </Link>
        <div className='product-center'>
          <section className='content'>
            <h2 className=''>{name}</h2>
            <ProductImages images={images} />
            <h5 className='price'>{price} DZD</h5>
            <p className='desc'>{description}</p>
            <hr />
            <AddToCart product={product} />
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
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
      font-size: 1.25rem;
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
