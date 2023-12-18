import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { sassFalse } from 'sass'

const ProductsPage = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState(false)
  const [categoryF, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [productFiltred, setProduct] = useState([])
  const [data, setData] = useState([])
  const FetchFilter = async (gender, categoryId) => {
    try {
      // let url =
      //   'http://localhost:3000/products?sexe=${gender}&category=${categoryId}'
      // if (gender) {
      //   url += `?sexe=${gender}`
      // }
      // if (categoryId) {
      //   url += `${gender ? '&' : '?'}category=${categoryId}`
      // }
      const response = await axios.get(
        `http://localhost:3000/products?sexe=${gender}&category=${categoryId}`
      )
      setProduct(response.data.products)
      setFilter(true)
      console.log('filtred', productFiltred)
    } catch (error) {
      console.error('Error loading more products:', error)
    }
  }
  const findCategoryIdByName = (categoryName) => {
    const foundCategory = data.find(
      (category) => category.name === categoryName
    )
    return foundCategory ? foundCategory._id : null
  }
  const categoryId = findCategoryIdByName(categoryF)
  if (categoryId) {
    console.log(`The ID of ${categoryF} is ${categoryId}`)
  } else {
    console.log(`Category ${categoryF} not found`)
  }
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories/')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <PageHero title={t('heroProducts')} />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters
            categoryF={categoryF}
            gender={gender}
            setCategory={setCategory}
            categoryId={categoryId}
            setGender={setGender}
            FetchFilter={FetchFilter}
            data={data}
          />
          <div>
            <Sort />
            <ProductList filter={filter} productFilterd={productFiltred} />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
