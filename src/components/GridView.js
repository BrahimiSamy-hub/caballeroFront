import React, { useEffect } from 'react'
import styled from 'styled-components'
import Product from './Product'

const GridView = ({ products, handleLoadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        handleLoadMore()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleLoadMore])
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          return <Product key={product._id} {...product} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 380px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 10px;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`

export default GridView
