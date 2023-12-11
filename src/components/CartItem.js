// import React from 'react'
// import styled from 'styled-components'
// // import { formatPrice } from "../utils/helpers"
// import AmountButtons from './AmountButtons'
// import { FaTrash } from 'react-icons/fa'
// import { useCartContext } from '../context/cart_context'
// // const CartItem = ({ id, name, image, volume, prices, amount }) => {
// const CartItem = ({ id, name, image, volume, prices, amount }) => {
//   const { removeItem, toggleAmount } = useCartContext()
//   const increase = () => {
//     toggleAmount(id, 'inc')
//   }
//   const decrease = () => {
//     toggleAmount(id, 'dec')
//   }
//   // return (
//   //   <Wrapper>
//   //     <div className='title'>
//   //       <img src={image} alt={name} />
//   //       <div>
//   //         <h5 className='name'>
//   //           {name} Vol.{volume}
//   //         </h5>
//   //         <h5 className='price-small'>{prices[1].price}DZD</h5>
//   //       </div>
//   //     </div>
//   //     <h5 className='price'>{price}DZD</h5>
//   //     <AmountButtons amount={amount} increase={increase} decrease={decrease} />
//   //     <h5 className='subtotal'> {price * amount}</h5>
//   //     <button
//   //       type='button '
//   //       className='remove-btn'
//   //       onClick={() => removeItem(id)}
//   //     >
//   //       <FaTrash />
//   //     </button>
//   //   </Wrapper>
//   // )
//   return (
//     <Wrapper>
//       <div className='title'>
//         <img src='' alt='' />
//         <div>
//           <h5 className='name'></h5>
//           <h5 className='price-small'>DZD</h5>
//         </div>
//       </div>
//       <h5 className='price'>DZD</h5>
//       <AmountButtons amount={amount} increase={increase} decrease={decrease} />
//       <h5 className='subtotal'></h5>
//       <button
//         type='button '
//         className='remove-btn'
//         // onClick={() => removeItem(_id)}
//       >
//         <FaTrash />
//       </button>
//     </Wrapper>
//   )
// }
import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
// import { formatPrice } from "../utils/helpers"
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
const CartItem = ({ item }) => {
  const { _id, price, name, type, amount, image } = item
  const [cartItems, setCartItems] = useState([])
  const { removeItem, toggleAmount } = useCartContext()
  const increase = () => {
    toggleAmount(_id, 'inc')
  }
  const decrease = () => {
    toggleAmount(_id, 'dec')
  }
  console.log('Item details:', name, type, price, image) // Debugging line

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(storedItems)
  }, [])

  return (
    <Wrapper>
      <div className='title'>
        <img src={image.url} alt='' crossOrigin='anonymous' />
        <div>
          <h5 className='name'>{name + ' ' + type}</h5>
          <h5 className='price-small'>{item.type}DZD </h5>
        </div>
      </div>
      <h5 className='price'>{price}DZD </h5>
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <h5 className='subtotal'>{price * amount} DZD</h5>
      <button
        type='button'
        className='remove-btn'
        onClick={() => removeItem(_id)} // You may need to implement removeItem function
      >
        <FaTrash />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 100px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 100px;
    display: grid;
    grid-template-columns: 100px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 80%;
    height: 120%;
    margin-left: 10px;
    display: block;
    border-radius: var(--radius);
    /* object-fit: cover; */
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      margin-left: 0.5rem;
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 100px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-9);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 100px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`

export default CartItem
