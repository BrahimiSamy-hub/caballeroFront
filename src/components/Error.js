import React from 'react'
import { useTranslation } from 'react-i18next'

const Error = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className='title'>
        <h2>{t('productsF')}</h2>
        <div className='underline'></div>
      </div>
      <div className='section section-center text-center'>
        <h2>{t('error')}</h2>
      </div>
    </div>
  )
}

export default Error
