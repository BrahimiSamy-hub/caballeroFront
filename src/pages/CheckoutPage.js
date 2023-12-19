import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PageHero, AlertOrder } from '../components'
import axios from 'axios'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'
import { FaCity } from 'react-icons/fa'
import WilayasData from '../utils/wilayas.json'
import { useTranslation } from 'react-i18next'
import { API_ENDPOINT } from '../config'
const CheckoutPage = () => {
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [selectedWilaya, setSelectedWilaya] = useState('')
  const [selectedCommune, setSelectedCommune] = useState('')
  const [communes, setCommunes] = useState([])
  const [phone, setPhone] = useState('')
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/wilayas/`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (selectedWilaya) {
      setCommunes(WilayasData.filter((data) => data.wilaya === selectedWilaya))
    }
  }, [selectedWilaya])
  const wilayaName = selectedWilaya.includes('-')
    ? selectedWilaya.split('-')[1].trim()
    : selectedWilaya
  const orderItems = JSON.parse(localStorage.getItem('cart'))
  const orderData = {
    orderItems: orderItems.map((item) => ({
      product: item._id,
      quantity: item.amount,
      priceType: item.type,
    })),
    wilaya: wilayaName,
    phoneNumber: phone,
  }
  const validateForm = () => {
    return (
      name !== '' &&
      phone !== '' &&
      selectedCommune !== '' &&
      selectedWilaya !== ''
    )
  }
  const calculateDeliveryPrice = () => {
    const wilayaData = data.find((wilaya) => wilaya.name === wilayaName)
    return wilayaData ? wilayaData.price : 0
  }
  const order = () => {
    if (!validateForm()) {
      return
    }
    setLoading(true)
    axios
      .post(`${API_ENDPOINT}/orders`, orderData)
      .then((response) => {
        if (response.status === 201) {
          setOrderSuccess(true)
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false)
      })

    setButtonDisabled(true)

    setTimeout(() => {
      setButtonDisabled(false)
    }, 5000)
  }
  if (orderSuccess) {
    return (
      <main>
        <PageHero title={t('heroCheckout')} />
        <AlertOrder />
      </main>
    )
  }
  const deliveryPrice = calculateDeliveryPrice()
  const updatedOrderItems = orderItems.map((item) => ({
    ...item,
    total: item.price * item.amount + deliveryPrice,
  }))
  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.amount,

    0
  )

  return (
    <main>
      <PageHero title={t('heroCheckout')} />
      <Wrapper className='page'>
        <div className='flex'>
          <div
            className='container'
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <form id='form1' method='post'>
              <div className='row'>
                <h4>{t('checkout')}</h4>
                <div className='input-group input-group-icon'>
                  <input
                    type='text'
                    placeholder={t('fullName')}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                  <div className='input-icon'>
                    <BsFillPersonFill />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='input-group input-group-icon '>
                  <select
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    value={selectedWilaya}
                    required
                  >
                    <option value='' className='margin'>
                      {t('chWilaya')}
                    </option>
                    {[...new Set(WilayasData.map((data) => data.wilaya))].map(
                      (wilaya) => (
                        <option key={wilaya} value={wilaya}>
                          {wilaya}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    onChange={(e) => setSelectedCommune(e.target.value)}
                    value={selectedCommune}
                    required
                    disabled={!selectedWilaya}
                  >
                    <option value=''>{t('chCommune')}</option>
                    {communes.map((data) => (
                      <option key={data.code} value={data.commune}>
                        {data.commune}
                      </option>
                    ))}
                  </select>

                  <div className='input-icon'>
                    <FaCity />
                  </div>
                </div>
              </div>

              <div className='input-group input-group-icon'>
                <input
                  type='tel'
                  placeholder={t('phone')}
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
                <div className='input-icon'>
                  <AiFillPhone />
                </div>
              </div>
              <button
                form='form1'
                type='submit'
                className='btn'
                disabled={(isButtonDisabled, loading)}
                onClick={order}
              >
                {loading ? t('loading') : t('order')}
              </button>
            </form>
          </div>
          <div
            className='container'
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <form id='form2' method='post'>
              <div className='row'>
                <h4>{t('subtotal')}</h4>
              </div>

              <div className='cart-item marginTop'>
                <div
                  style={{
                    color: '#1d4851',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h3>
                    {t('Price')} :{totalPrice} {t('Currency')}
                  </h3>
                </div>
                <div
                  className='cart-item'
                  style={{
                    color: '#1d4851',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h3>
                    {t('PriceShip')} :{deliveryPrice} {t('Currency')}
                  </h3>
                </div>
                <hr />
                {selectedWilaya && (
                  <div
                    style={{
                      color: '#1d4851',
                      fontWeight: 'bold',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <h3>
                      {t('priceDel')}
                      {totalPrice + calculateDeliveryPrice()}
                      {t('Currency')}
                    </h3>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  min-height: 650px;
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  .marginTop {
    margin-top: 40px;
  }
  .flex {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  body {
    padding: 1em;
    /* font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; */
    font-size: 15px;
    color: #1d4851;
    background-color: #e3e3e3;
  }
  .margin {
    margin-left: 15px;
  }

  h4 {
    color: var(--clr-primary-9);
    text-align: center;
  }
  input,
  input[type='radio'] + label,
  select option,
  select {
    width: 100%;
    padding: 1em;
    line-height: 1.4;
    background-color: #f9f9f9;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
    transition: 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
  }
  input:focus {
    outline: 0;
    border-color: #1d4851;
  }
  input:focus + .input-icon:after {
    border-right-color: #1d4851;
  }
  input[type='radio'] {
    display: none;
  }
  input[type='radio'] + label,
  select {
    display: inline-block;
    width: 50%;
    text-align: center;
    border-radius: 0;
  }
  input[type='radio'] + label:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  input[type='radio'] + label:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  input[type='radio'] + label i {
    padding-right: 0.4em;
  }
  input[type='radio']:checked + label,
  select {
    height: 3.4em;
    line-height: 2;
  }
  select:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  select:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  select:focus,
  select:active {
    outline: 0;
  }
  select option {
    color: black;
  }
  .input-group {
    margin-bottom: 1em;
    zoom: 1;
  }
  .input-group:before,
  .input-group:after {
    content: '';
    display: table;
  }
  .input-group:after {
    clear: both;
  }
  .input-group-icon {
    position: relative;
  }
  .input-group-icon input {
    padding-left: 4.4em;
  }
  .input-group-icon .input-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 3.4em;
    height: 3.4em;
    line-height: 3.4em;
    text-align: center;
    pointer-events: none;
  }
  .input-group-icon .input-icon:after {
    position: absolute;
    top: 0.6em;
    bottom: 0.6em;
    left: 3.4em;
    display: block;
    border-right: 1px solid #e5e5e5;
    content: '';
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
    transition: 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
  }
  .input-group-icon .input-icon i {
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
    transition: 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
  }
  .container {
    max-width: 38em;
    padding: 1em 3em 2em 3em;
    margin: 0em auto;
    background-color: #fff;
    border-radius: 4.2px;
    box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
  }
  .row {
    zoom: 1;
  }
  .row:before,
  .row:after {
    content: '';
    display: table;
  }
  .row:after {
    clear: both;
  }
  @media (max-width: 992px) {
    .flex {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`
export default CheckoutPage
