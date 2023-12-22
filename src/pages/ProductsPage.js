import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'
import { useTranslation } from 'react-i18next'
import { useProductsContext } from '../context/products_context'
import axios from 'axios'
import { API_ENDPOINT } from '../config'
const ProductsPage = () => {
  const { t } = useTranslation()
  const { totalProducts } = useProductsContext()

  const [categoryF, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [productFiltred, setProduct] = useState([])
  const [data, setData] = useState([])

  const findCategoryIdByName = (categoryName) => {
    const foundCategory = data.find(
      (category) => category.name === categoryName
    )
    return foundCategory ? foundCategory._id : null
  }
  const categoryId = findCategoryIdByName(categoryF)

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
          <Filters
            categoryF={categoryF}
            gender={gender}
            setCategory={setCategory}
            categoryId={categoryId}
            setGender={setGender}
            data={data}
          />
          <div>
            <Sort totalProducts={totalProducts} />
            <ProductList productFilterd={productFiltred} />
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

export default ProductsPage
