// import React, { useState } from 'react'
// import styled from 'styled-components'
// // import { formatPrice } from "../utils/helpers"
// // import { FaSearch } from "react-icons/fa"
// import { Link } from 'react-router-dom'

// const Product = ({ images = [], name, price, id, volume }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   return (
//     <Wrapper>
//       <div
//         style={{ width: 250 + 'px' }}
//         className='container center'
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link to={`/products/${id}`} className=''>
//           <img
//             src={isHovered && images[0] ? images[0] : images[1]}
//             alt={name}
//           />

//           {/* <FaSearch /> */}
//         </Link>
//       </div>
//       <footer
//         // style={{ width: 250 + "px" }}
//         className=' center margin'
//       >
//         <Link to={`/products/${id}`}>
//           <h5>
//             {name} Vol {volume}
//           </h5>
//         </Link>

//         <p>{price} DZD</p>
//       </footer>
//     </Wrapper>
//   )
// }
import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Product = ({ images = [], name, price, _id, volume }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Wrapper>
      <div
        className='container center'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/products/${_id}`}>
          <div className='image-container'>
            <img
              src={images[0]}
              alt={name}
              className={!isHovered ? 'active' : ''}
            />
            <img
              src={images[1]}
              alt={name}
              className={isHovered ? 'active' : ''}
            />
          </div>
        </Link>
      </div>
      <footer className='center margin'>
        <Link className='linkV' to={`/products/${_id}`}>
          <h5>
            {name} {volume}
            <small>ml</small>
          </h5>
        </Link>
        <p className='price'>{price} DZD</p>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .price {
    font-size: 1.15rem;
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
    transition: opacity 1s ease;
    opacity: 0;
  }
  img.active {
    opacity: 1;
  }
  .container {
    position: relative;
    // Remove the background color if it's not needed, or make sure it matches the image's background
    border-radius: var(--radius); // Apply border-radius to the container
    overflow: hidden; // This ensures nothing spills outside the border-radius
  }

  .image-container {
    position: relative;
    width: 250px;
    height: 380px;
    border-radius: var(--radius); // Match the border-radius here if necessary
  }

  img {
    position: absolute;
    width: 100%; // Fill the container width
    height: 100%; // Fill the container height
    object-fit: cover; // Cover the container fully
    border-radius: var(--radius); // Apply border-radius to images if needed
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
  footer p {
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
