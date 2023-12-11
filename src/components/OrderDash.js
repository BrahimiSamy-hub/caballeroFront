import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  Modal,
  Box,
  Fade,
  Button,
  Typography,
  FormControl,
  TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import '../Styling/Outlet.scss'

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

function MyComponent() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      width: 300,
      renderCell: (params) => {
        return params.row.orderItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <br />}
            {item.product.name}
          </React.Fragment>
        ))
      },
    },
    {
      field: 'Quantity',
      headerName: 'Quantity',
      width: 300,
      renderCell: (params) => {
        return params.row.orderItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <br />}
            {item.quantity}
          </React.Fragment>
        ))
      },
    },
    {
      field: 'Type',
      headerName: 'priceType',
      width: 300,
      renderCell: (params) => {
        return params.row.orderItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <br />}
            {item.priceType}
          </React.Fragment>
        ))
      },
    },

    { field: 'wilaya', headerName: 'wilaya', width: 200, editable: false },
    { field: 'total', headerName: 'total', width: 200, editable: false },
    {
      field: 'phoneNumber',
      headerName: 'phoneNumber',
      width: 100,
      editable: false,
    },
    {
      field: 'isConfirmed',
      headerName: 'isConfirmed',
      width: 80,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 100,
      type: 'string',
      renderCell: (params) => {
        const date = new Date(params.row.createdAt)
        const formattedDate = date.toLocaleDateString()
        return <span>{formattedDate}</span>
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      renderCell: (params) => (
        <div className='action'>
          <Button
            onClick={() =>
              updateOrderConfirmation(params.row._id, !params.row.isConfirmed)
            }
            variant='contained'
            color={params.row.isConfirmed ? 'secondary' : 'primary'}
          >
            {params.row.isConfirmed ? 'Unconfirm' : 'Confirm'}
          </Button>
        </div>
      ),
    },
  ]
  const fetchData = async () => {
    const token = localStorage.getItem('jwt')
    try {
      const response = await axios.get('http://localhost:3000/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const updateOrderConfirmation = async (orderId, newStatus) => {
    const token = localStorage.getItem('jwt')
    try {
      await axios.put(
        `http://localhost:3000/orders/${orderId}`,
        { isConfirmed: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchData() // Refresh data after update
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  return (
    <div className='dataGridContainer'>
      <Button variant='disabled' onClick={handleOpen}>
        Orders
      </Button>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='modal-title' variant='h6'>
              Add Category
            </Typography>
            <form onSubmit=''>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  required
                  id='name'
                  label='Name'
                  type='text'
                  value=''
                />
                <Button type='submit' sx={{ mt: 2 }} variant='contained'>
                  Submit
                </Button>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
      <div className='dataTable'>
        <DataGrid
          className='dataGrid'
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          pageSize={10}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { decounceMs: 500 },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    </div>
  )
}

export default MyComponent
