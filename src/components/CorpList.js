import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'
import { useTranslation } from 'react-i18next'
import { API_ENDPOINT } from '../config'
const CorpList = ({ productFiltred, categoryId }) => {
  const { t } = useTranslation()
  const { grid_view } = useFilterContext()
  const [page, setPage] = useState(2)
  const [product, setProduct] = useState([])
  const { totalPages } = useProductsContext()
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/products?category=656a442c08476652e1cc4108`
      )
      setProduct(response.data.products)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const handleLoadMore = async () => {
    try {
      if (page > totalPages) {
        return
      }

      const response = await axios.get(
        `${API_ENDPOINT}/products?page=${page}&category=656a442c08476652e1cc4108`
      )
      const newProducts = response.data.products
      setProduct((prevProducts) => [...prevProducts, ...newProducts])
      setPage(page + 1)
    } catch (error) {
      console.error('Error loading more products:', error)
    }
  }

  if (product.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>{t('noProduct')}</h5>
  }

  if (grid_view === false) {
    return <ListView products={product} handleLoadMore={handleLoadMore} />
  }

  return <GridView products={product} handleLoadMore={handleLoadMore} />
}

export default CorpList
