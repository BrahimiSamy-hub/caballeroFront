import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <Wrapper>
      <img src={mainImage} alt='MainImage' className='main' />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt='img'
              key={index}
              onClick={() => setMainImage(images[index])}
              className={`${image === mainImage ? 'active' : null}`}
            />
          )
        })}
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
