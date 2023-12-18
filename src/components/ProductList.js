import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext()
  const [page, setPage] = useState(2)
  const [product, setProduct] = useState(products)
  const { totalPages } = useProductsContext()

  useEffect(() => {
    setProduct(products)
  }, [products])

  const handleLoadMore = async () => {
    try {
      console.log('total', totalPages)
      if (page > totalPages) {
        return
      }

      const response = await axios.get(
        `http://localhost:3000/products?page=${page}&limit=12`
      )
      const newProducts = response.data.products
      setProduct((prevProducts) => [...prevProducts, ...newProducts])
      setPage(page + 1)
      console.log(page)
    } catch (error) {
      console.error('Error loading more products:', error)
    }
  }

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }

  if (grid_view === false) {
    return <ListView products={product} handleLoadMore={handleLoadMore} />
  }

  return <GridView products={product} handleLoadMore={handleLoadMore} />
}

export default ProductList
