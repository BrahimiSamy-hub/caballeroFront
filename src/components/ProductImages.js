import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ image1, image2 }) => {
  const [currentImage, setCurrentImage] = useState(image1)

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl)
  }

  return (
    <Wrapper>
      <div>
        <img
          src={currentImage}
          alt='Main'
          className='main'
          crossOrigin='anonymous'
        />
        <div className='gallery'>
          <img
            src={image1}
            alt='Main'
            onClick={() => handleImageClick(image1)}
            className={currentImage === image1 ? 'active' : ''}
            crossOrigin='anonymous'
          />
          <img
            src={image2}
            alt='Secondary'
            onClick={() => handleImageClick(image2)}
            className={currentImage === image2 ? 'active' : ''}
            crossOrigin='anonymous'
          />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    width: 250px;
    height: 280px;
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
      height: 380px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
