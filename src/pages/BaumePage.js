import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Filters, Baume, Sort, PageHero } from '../components'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { API_ENDPOINT } from '../config'
const BaumePage = () => {
  const { t } = useTranslation()
  const [product, setProduct] = useState([])
  const [totalProducts, setTotalProducts] = useState()
  const [data, setData] = useState([])

  const fetchDataGet = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/products?category=656a442508476652e1cc4106`
      )
      setProduct(response.data.products)
      setTotalProducts(response.data.totalProducts)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchDataGet()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/categories/`)
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
          <Filters data={data} />
          <div>
            <Sort totalProducts={totalProducts} />
            <Baume products={product} />
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

export default BaumePage
