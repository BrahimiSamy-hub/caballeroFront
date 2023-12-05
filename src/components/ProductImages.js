import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ image1, image2 }) => {
  return (
    <Wrapper>
      <img src={image1} alt='MainImage' className='main' />
      <div className='gallery'>
        {/* <img
          src={image}
          alt='img'

        /> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 350px;
  }
  img {
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 55px);
    column-gap: 30px;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-9);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
