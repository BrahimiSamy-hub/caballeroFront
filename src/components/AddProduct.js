// import React, { useState } from 'react'
// import '../Styling/AddProduct.scss'

// const Add = () => {
//   const [isFormVisible, setFormVisible] = useState(false)

//   const toggleFormVisibility = () => {
//     setFormVisible(!isFormVisible)
//   }

//   return (
//     <div>
//       <button onClick={toggleFormVisibility}>Add Product</button>

//       {isFormVisible && (
//         <div className='form-container'>
//           <span className='close' onClick={toggleFormVisibility}>
//             X
//           </span>
//           <form>
//             <div className='item'>
//               <label>dsqds</label>
//               <input type='text' placeholder='Enter something...' />
//               <label>dsqds</label>
//               <input type='text' placeholder='Enter something...' />
//               <label>dsqds</label>
//               <input type='text' placeholder='Enter something...' />
//               <label>dsqds</label>
//               <input type='text' placeholder='Enter something...' />
//               <label>dsqds</label>
//               <input type='text' placeholder='Enter something...' />
//               <label>dsqds</label>
//               <input type='text' placeholder='Enter something...' />
//             </div>
//             <button type='submit'>Submit</button>
//           </form>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Add
// import { GridToolbar } from '@mui/x-data-grid'
// import Button from '@mui/material/Button'
// import React, { useState } from 'react'
// import '../Styling/AddProduct.scss'

// const AddProduct = () => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <GridToolbar />
//       <Button
//         variant='contained'
//         color='primary'
//         style={{ marginLeft: '10px' }}
//       >
//         Your Button Text
//       </Button>
//     </div>
//   )
// }

// export default AddProduct
import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl' // Import FormControl for form control
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false)
  const [category, setCategory] = React.useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log({
      email: formData.get('email'), // Replace with actual field names and values
      // ... other form data
    })
  }
  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Add Product
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Add Product
            </Typography>
            {/* Form inside the modal */}
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id='name'
                      name='name'
                      label='name'
                      type='text'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id='Volume'
                      name='Volume'
                      label='Volume'
                      type='text'
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id='price'
                      name='price'
                      label='price'
                      type='number'
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <input
                      accept='image/*'
                      // style={{ display: 'none' }}
                      id='raised-button-file'
                      multiple
                      type='file'
                      style={{
                        width: '100%',
                        padding: '18.5px 14px',
                        marginTop: '16px',
                      }}
                    />
                    {/* Button to trigger file input */}
                  </Grid>
                </Grid>

                <BaseTextareaAutosize
                  minRows={1}
                  placeholder='description'
                  style={{
                    width: '100%',
                    padding: '18.5px 14px',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    marginTop: '16px',
                    marginBottom: '8px',
                    borderRadius: '4px',
                    '&:focus': {
                      borderColor: 'primary.main',
                      outline: 'none',
                    },
                  }}
                />

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={category}
                      label='Category'
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormLabel id='demo-row-radio-buttons-group-label'>
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                    >
                      <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                      />
                      <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                      />
                      <FormControlLabel
                        value='unisex'
                        control={<Radio />}
                        label='Unisex'
                      />
                    </RadioGroup>
                    <FormLabel id='demo-row-radio-buttons-group-label'>
                      Seasons
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                    >
                      <FormControlLabel
                        value='winter'
                        control={<Radio />}
                        label='Winter'
                      />
                      <FormControlLabel
                        value='spring '
                        control={<Radio />}
                        label='Spring '
                      />
                      <FormControlLabel
                        value='summer '
                        control={<Radio />}
                        label='Summer '
                      />
                      <FormControlLabel
                        value='autumn'
                        control={<Radio />}
                        label='Autumn'
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                {/* <TextField
                  required
                  id='Instock'
                  name='Instock'
                  label='Instock'
                  type='text'
                /> */}

                {/* Add more form fields as needed */}
                <Button type='submit' sx={{ mt: 2 }} variant='contained'>
                  Submit
                </Button>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
