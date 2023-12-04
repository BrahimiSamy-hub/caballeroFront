// import React, { useState } from "react"
// import styled from "styled-components"
// import { BsFillPersonFill } from "react-icons/bs"
// import { AiFillPhone } from "react-icons/ai"
// import { MdEmail } from "react-icons/md"
// import { FaAddressBook, FaCity } from "react-icons/fa"
// import axios from "axios"

// const FormOrder = () => {
//   const [isButtonDisabled, setButtonDisabled] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [phone, setPhone] = useState("")
//   const [address, setAddress] = useState("")
//   const [city, setCity] = useState("")
//   const orderItems = JSON.parse(localStorage.getItem("cart"))
//   const orderData = {
//     orderItems: orderItems.map((item) => ({
//       quantity: item.amount,
//       product: item.id,
//     })),
//     shippingAddress1: address,
//     zip: "0500",
//     city: city,
//     phone: phone,
//     email: email,
//     name: name,
//   }
//   setLoading(true)
//   const order = () => {
//     axios
//       .post(
//         "https://e-commerce-rest-api-production.up.railway.app/api/v1/orders",
//         orderData
//       )
//       .then((response) => {
//         // Handle successful login
//         console.log(response.data)
//         if (response.status === 200) {
//           alert("succes")
//         }
//       })
//       .catch((error) => {
//         // Handle login error
//         console.error(error)
//       })
//       .finally(() => {
//         setLoading(false)
//       })

//     // Disable the button when clicked
//     setButtonDisabled(true)

//     // Enable the button after 3 seconds
//     setTimeout(() => {
//       setButtonDisabled(false)
//     }, 5000)
//   }

//   return (
//     <Wrapper className='page'>
//       <div className='container' style={{ marginTop: 50 }}>
//         <form method='post'>
//           <div className='row'>
//             <h4>Confirm order</h4>
//             <div className='input-group input-group-icon'>
//               <input
//                 type='text'
//                 placeholder='Full Name'
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 required
//               />
//               <div className='input-icon'>
//                 <BsFillPersonFill />
//               </div>
//             </div>
//             <div className='input-group input-group-icon'>
//               <input
//                 type='email'
//                 placeholder='Email Adress'
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 required
//               />
//               <div className='input-icon'>
//                 <MdEmail />
//               </div>
//             </div>
//           </div>
//           <div className='row'>
//             <div className='input-group input-group-icon'>
//               <select
//                 onChange={(e) => setCity(e.target.value)}
//                 value={city}
//                 required
//               >
//                 <option value=''>--Choose your city--</option>
//                 <option value='Adrar'>01 - Adrar </option>
//                 <option value='Chlef'>02 - Chlef </option>
//                 <option value='Laghouat'>03 - Laghouat </option>
//                 <option value='Oum El Bouaghi'>04 - Oum El Bouaghi </option>
//                 <option value='Batna'>05 - Batna</option>
//                 <option value='Setif'>06 - Setif</option>
//                 <option value='Biskra'>07 - Biskra </option>
//                 <option value='Béchar'>08 - Béchar</option>
//                 <option value='Blida'>09 - Blida</option>
//                 <option value='Bouira'>10 - Bouira</option>
//                 <option value='Tamanrasset'>11 - Tamanrasset</option>
//                 <option value='Tébessa'>12 - Tébessa</option>
//                 <option value='Tlemcen'>13 - Tlemcen</option>
//                 <option value='Tiaret'>14 - Tiaret</option>
//                 <option value='Tizi Ouzou'>15 - Tizi Ouzou</option>
//                 <option value='Alger'>16 - Alger</option>
//                 <option value='Djelfa'>17 - Djelfa</option>
//                 <option value='Djelfa'>18 - Djelfa</option>
//                 <option value='Sétif'>19 - Sétif</option>
//                 <option value='Saïda'>20 - Saïda</option>
//                 <option value='Skikda'>21 - Skikda</option>
//                 <option value='Sidi Bel Abbès'>22 - Sidi Bel Abbès</option>
//                 <option value='Annaba'>23 - Annaba</option>
//                 <option value='Guelma'>24 - Guelma</option>
//                 <option value='Constantine'>25 - Constantine</option>
//                 <option value='Médéa'>26 - Médéa</option>
//                 <option value='Mostaganem'>27 - Mostaganem</option>
//                 <option value='M`Sila'>28 - M'Sila</option>
//                 <option value='Mascara'>29 - Mascara</option>
//                 <option value='Ouargla'>30 - Ouargla</option>
//                 <option value='Oran'>31 - Oran</option>
//                 <option value='Bayadh'>32 - Bayadh</option>
//                 <option value='Illizi'>33 - Illizi</option>
//                 <option value='Bordj Bou Arreridj'>
//                   34 - Bordj Bou Arreridj
//                 </option>
//                 <option value='Boumerdès'>35 - Boumerdès</option>
//                 <option value='El Tarf'>36 - El Tarf</option>
//                 <option value='Tindouf'>37 - Tindouf</option>
//                 <option value='Tissemsilt'>38 - Tissemsilt</option>
//                 <option value='El Oued'>39 - El Oued</option>
//                 <option value='Khenchela'>40 - Khenchela</option>
//                 <option value='Souk Ahras'>41 - Souk Ahras</option>
//                 <option value='Tipaza'>42 - Tipaza</option>
//                 <option value='Mila'>43 - Mila</option>
//                 <option value='Aïn Defla'>44 - Aïn Defla</option>
//                 <option value='Naâma'>45 - Naâma</option>
//                 <option value='Témouchent'>46 - Témouchent</option>
//                 <option value='Ghardaïa'>47 - Ghardaïa</option>
//                 <option value='Relizane'>48 - Relizane</option>
//                 <option value='Timimoun'>49 - Timimoun</option>
//                 <option value='Bordj Badji Mokhtar'>
//                   50 - Bordj Badji Mokhtar
//                 </option>
//                 <option value='Ouled Djellal'>51 - Ouled Djellal</option>
//                 <option value='Béni Abbès'>52 - Béni Abbès</option>
//                 <option value='In Salah'>53 - In Salah</option>
//                 <option value='In Guezzam'>54 - In Guezzam</option>
//                 <option value='Touggourt'>55 - Touggourt</option>
//                 <option value='Djanet'>56 - Djanet</option>
//                 <option value='El M`Ghair'>57 - El M'Ghair</option>
//                 <option value='El Meniaa'>58 - El Meniaa</option>
//               </select>
//               <div className='input-icon'>
//                 <FaCity />
//               </div>
//             </div>
//           </div>
//           <div className='input-group input-group-icon'>
//             <input
//               type='text'
//               placeholder='Address'
//               onChange={(e) => setAddress(e.target.value)}
//               value={address}
//               required
//             />

//             <div className='input-icon'>
//               <FaAddressBook />
//             </div>
//           </div>
//           <div className='input-group input-group-icon'>
//             <input
//               type='tel'
//               placeholder='Phone'
//               onChange={(e) => setPhone(e.target.value)}
//               value={phone}
//               required
//             />
//             <div className='input-icon'>
//               <AiFillPhone />
//             </div>
//           </div>
//         </form>
//         <button
//           id='monBouton'
//           type='submit'
//           className='btn'
//           disabled={(isButtonDisabled, loading)}
//           onClick={order}
//         >
//           {loading ? "Loading..." : "Order"}
//         </button>
//       </div>
//     </Wrapper>
//   )
// }
// const Wrapper = styled.div`
//   /* 64ac15 */
//   *,
//   *:before,
//   *:after {
//     box-sizing: border-box;
//   }
//   body {
//     padding: 1em;
//     font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
//     font-size: 15px;
//     color: #b9b9b9;
//     background-color: #e3e3e3;
//   }
//   h4 {
//     color: var(--clr-primary-5);
//     text-align: center;
//   }
//   input,
//   input[type="radio"] + label,
//   select option,
//   select {
//     width: 100%;
//     padding: 1em;
//     line-height: 1.4;
//     background-color: #f9f9f9;
//     border: 1px solid #e5e5e5;
//     border-radius: 3px;
//     -webkit-transition: 0.35s ease-in-out;
//     -moz-transition: 0.35s ease-in-out;
//     -o-transition: 0.35s ease-in-out;
//     transition: 0.35s ease-in-out;
//     transition: all 0.35s ease-in-out;
//   }
//   input:focus {
//     outline: 0;
//     border-color: #bd8200;
//   }
//   input:focus + .input-icon:after {
//     border-right-color: #f0a500;
//   }
//   input[type="radio"] {
//     display: none;
//   }
//   input[type="radio"] + label,
//   select {
//     display: inline-block;
//     width: 50%;
//     text-align: center;
//     border-radius: 0;
//   }
//   input[type="radio"] + label:first-of-type {
//     border-top-left-radius: 3px;
//     border-bottom-left-radius: 3px;
//   }
//   input[type="radio"] + label:last-of-type {
//     border-top-right-radius: 3px;
//     border-bottom-right-radius: 3px;
//   }
//   input[type="radio"] + label i {
//     padding-right: 0.4em;
//   }
//   input[type="radio"]:checked + label,
//   select {
//     height: 3.4em;
//     line-height: 2;
//   }
//   select:first-of-type {
//     border-top-left-radius: 3px;
//     border-bottom-left-radius: 3px;
//   }
//   select:last-of-type {
//     border-top-right-radius: 3px;
//     border-bottom-right-radius: 3px;
//   }
//   select:focus,
//   select:active {
//     outline: 0;
//   }
//   select option {
//     color: black;
//   }
//   .input-group {
//     margin-bottom: 1em;
//     zoom: 1;
//   }
//   .input-group:before,
//   .input-group:after {
//     content: "";
//     display: table;
//   }
//   .input-group:after {
//     clear: both;
//   }
//   .input-group-icon {
//     position: relative;
//   }
//   .input-group-icon input {
//     padding-left: 4.4em;
//   }
//   .input-group-icon .input-icon {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 3.4em;
//     height: 3.4em;
//     line-height: 3.4em;
//     text-align: center;
//     pointer-events: none;
//   }
//   .input-group-icon .input-icon:after {
//     position: absolute;
//     top: 0.6em;
//     bottom: 0.6em;
//     left: 3.4em;
//     display: block;
//     border-right: 1px solid #e5e5e5;
//     content: "";
//     -webkit-transition: 0.35s ease-in-out;
//     -moz-transition: 0.35s ease-in-out;
//     -o-transition: 0.35s ease-in-out;
//     transition: 0.35s ease-in-out;
//     transition: all 0.35s ease-in-out;
//   }
//   .input-group-icon .input-icon i {
//     -webkit-transition: 0.35s ease-in-out;
//     -moz-transition: 0.35s ease-in-out;
//     -o-transition: 0.35s ease-in-out;
//     transition: 0.35s ease-in-out;
//     transition: all 0.35s ease-in-out;
//   }
//   .container {
//     max-width: 38em;
//     padding: 1em 3em 2em 3em;
//     margin: 0em auto;
//     background-color: #fff;
//     border-radius: 4.2px;
//     box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
//   }
//   .row {
//     zoom: 1;
//   }
//   .row:before,
//   .row:after {
//     content: "";
//     display: table;
//   }
//   .row:after {
//     clear: both;
//   }
// `

// export default FormOrder
