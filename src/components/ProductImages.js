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
          className='mainn'
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
  .mainn {
    width: 350px;
    height: 350px;
    /* max-width: 250px;
    max-height: 280px; */
  }
  img {
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between; // Align images at the start and end
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
      height: 350;
    }
    .gallery {
      img {
        height: 65px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 350;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
