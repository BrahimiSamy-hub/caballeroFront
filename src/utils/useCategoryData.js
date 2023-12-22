import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../config'

const useCategoryData = (categoryName) => {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(null)
  const [categoryId, setCategoryId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${API_ENDPOINT}/categories/`
        )
        const category = categoriesResponse.data.find(
          (category) => category.name === categoryName
        )

        if (category) {
          setCategoryId(category._id)

          const productsResponse = await axios.get(
            `${API_ENDPOINT}/products?category=${category._id}`
          )
          setProducts(productsResponse.data.products)
          setTotalProducts(productsResponse.data.totalProducts)
        } else {
          console.warn(`Category "${categoryName}" not found.`)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [categoryName])

  return { products, totalProducts }
}

export default useCategoryData
