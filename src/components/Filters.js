import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues } from '../utils/helpers'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const Filters = () => {
  const { t } = useTranslation()
  const genderCategories = ['All', 'Men', 'Women', 'Unisex']
  const seasonCategories = ['All', 'Autumn', 'Winter', 'Spring', 'Summer']
  const {
    filters: { text, category },
    updateFilters,
    clearFilters,
    filtered_products,
    all_products,
  } = useFilterContext()
  const [data, setData] = useState([])
  const categories = getUniqueValues(all_products, 'name')
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories/')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const uniqueCategories = getUniqueValues(data, 'name')

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Wrapper>
      <div className='content '>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder={t('search')}
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search input */}
          <div className='form-control'>
            <h5>{t('cat')}</h5>
            <div>
              {uniqueCategories.map((categoryName, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name='category'
                    button='button'
                    className={`${category === categoryName ? 'active' : null}`}
                  >
                    {categoryName}
                  </button>
                )
              })}
            </div>
          </div>

          {/* gender */}
          {/* <div className='form-control'>
            <h5>{t('gender')}</h5>
            <div>
              {genderCategories.map((gender, index) => (
                <button
                  key={index}
                  onClick={updateFilters}
                  name='category'
                  type='button'
                  className={`${category === gender ? 'active' : ''}`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div> */}

          {/* Seasons */}
          {/* <div className='form-control'>
            <h5>{t('seasons')}</h5>
            <div>
              {seasonCategories.map((season, index) => (
                <button
                  key={index}
                  onClick={updateFilters}
                  name='category'
                  type='button'
                  className={`${category === season ? 'active' : ''}`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div> */}
          {/* end name */}
        </form>
        <button type='button' className='clear-btn ' onClick={clearFilters}>
          {t('clearF')}
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    border-color: var (--clr-primary-9);
    padding: 0.5rem;
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
