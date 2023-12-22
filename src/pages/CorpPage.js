import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Filters, Corp, Sort, PageHero } from '../components'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { API_ENDPOINT } from '../config'
const CorpPage = () => {
  const { t } = useTranslation()
  const [categoryF, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [product, setProduct] = useState([])
  const [totalProducts, setTotalProducts] = useState()
  const [data, setData] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [parfumsCategoryId, setParfumsCategoryId] = useState('')
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/categories/`)

      const parfumsCategory = response.data.find(
        (category) => category.name === 'Parfums De Corps'
      )
      console.log(categoryId)
      console.log(parfumsCategoryId)
      setCategoryId(parfumsCategory?._id || null)
      setParfumsCategoryId(parfumsCategory?._id || '')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchDataGet = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/products?category=${parfumsCategoryId}`
      )
      setProduct(response.data.products)
      setTotalProducts(response.data.totalProducts)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchDataGet()
  }, [parfumsCategoryId])

  return (
    <main>
      <PageHero title={t('heroProducts')} />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters data={data} />
          <div>
            <Sort totalProducts={totalProducts} />
            <Corp products={product} />
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
      /* grid-template-columns: 1fr 1fr; */
    }
  }
`

export default CorpPage
