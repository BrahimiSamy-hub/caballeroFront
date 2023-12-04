// import * as React from 'react'
// import { useState, useEffect } from 'react'

// import Backdrop from '@mui/material/Backdrop'
// import Box from '@mui/material/Box'
// import Modal from '@mui/material/Modal'
// import Fade from '@mui/material/Fade'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import FormControl from '@mui/material/FormControl'
// import axios from 'axios'
// import TextField from '@mui/material/TextField'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// }

// export default function TransitionsModal() {
//   const [open, setOpen] = React.useState(false)
//   const [category, setCategory] = React.useState('')
//   const [data, setData] = useState([])
//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/categories/')
//       setData(response.data)
//     } catch (error) {
//       console.error('Error fetching data:', error)
//     }
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     const payload = {
//       name: category,
//     }
//     const token = localStorage.getItem('jwt')

//     axios
//       .post('http://localhost:3000/categories/', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       .then((response) => {
//         console.log(response.data)
//         handleClose()
//         setCategory('')
//         fetchData()
//       })
//       .catch((error) => {
//         console.error('There was an error!', error)
//       })
//   }

//   // Update the `setCategory` function to handle input changes
//   const handleInputChange = (event) => {
//     setCategory(event.target.value)
//   }

//   return (
//     <div>
//       <Button variant='contained' onClick={handleOpen}>
//         Add Category
//       </Button>
//       <Modal
//         aria-labelledby='transition-modal-title'
//         aria-describedby='transition-modal-description'
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             timeout: 500,
//           },
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <Typography id='transition-modal-title' variant='h6' component='h2'>
//               Add Category
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <TextField
//                   required
//                   id='name'
//                   name='name'
//                   label='name'
//                   type='text'
//                   value={category} // Set the value
//                   onChange={handleInputChange} // Handle changes
//                 />
//                 <Button type='submit' sx={{ mt: 2 }} variant='contained'>
//                   Submit
//                 </Button>
//               </FormControl>
//             </form>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   )
// }
