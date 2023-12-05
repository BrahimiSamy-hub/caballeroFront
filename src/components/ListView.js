import React from 'react'
import styled from 'styled-components'
// import { formatPrice } from "../utils/helpers"
import { Link } from 'react-router-dom'
const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { _id, name, prices, description, image1, volume } = product
        return (
          <article key={_id}>
            <img src={image1.url} alt={name} />
            <div>{image1.url}</div>
            <div>
              <h4>
                {console.log(image1)}
                {name} {prices[0].type}
              </h4>
              <h5 className='price'>{prices[0].type} DZD</h5>
              {/* <p>{description.substring(0, 150)}</p> */}
              <Link to={`/products/${_id}`} className='btn hero-btn'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    display: block;
    width: 250px;
    height: 380px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-9);
    margin-bottom: 0.75rem;
  }
  .hero-btn {
    padding: 0.75rem 1.2rem;
    font-size: 0.8rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  /* .btn {
    font-size: 0.5rem;

    padding: 0.25rem 0.5rem;
  } */
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
  @media (max-width: 991px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
