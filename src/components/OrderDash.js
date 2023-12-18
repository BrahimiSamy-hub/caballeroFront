import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

import {
  Modal,
  Switch,
  Box,
  Fade,
  Button,
  Typography,
  FormControl,
  TextField,
} from '@mui/material'
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
  const [showActionsColumn, setShowActionsColumn] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false) // Add state to track isConfirmed
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const token = localStorage.getItem('jwt')

  const handleConfirmOrder = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:3000/orders/${orderId}`,
        {
          isConfirmed: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchData()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }
  const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      width: 300,
      renderCell: (params) => {
        return params.row.orderItems.map((item, index) => (
          <React.Fragment key={item._id}>
            {index > 0 && <br />}
            {item.product.name}
          </React.Fragment>
        ))
      },
    },
    {
      field: 'Quantity',
      headerName: 'Quantity',
      width: 40,
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
      headerName: 'Type',
      width: 100,
      renderCell: (params) => {
        return params.row.orderItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <br />}
            {item.priceType}
          </React.Fragment>
        ))
      },
    },
    { field: 'wilaya', headerName: 'wilaya', width: 150, editable: false },
    { field: 'total', headerName: 'total', width: 70, editable: false },
    {
      field: 'phoneNumber',
      headerName: 'phoneNumber',
      width: 150,
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
      field: 'Shipped',
      headerName: 'Shipped',
      width: 80,
      renderCell: (params) => (
        <Switch
          checked={params.row.isShipped}
          onChange={() =>
            handleConfirmOrderSwitch(params.row._id, params.row.isShipped)
          }
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: params.row.isShipped ? '#4CAF50' : '#FFFFFF',
            },
            '& .MuiSwitch-track': {
              backgroundColor: params.row.isShipped ? '#8BC34A' : 'black',
            },
          }}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 80,
      renderCell: (params) => (
        <div className='action'>
          <Link
            to='#'
            onClick={(event) => handleClickDelete(event, params.row._id)}
          >
            <img src='/delete.svg' alt='' />
          </Link>
        </div>
      ),
    },
  ]

  if (showActionsColumn) {
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      width: 50,
      renderCell: (params) => (
        <div className='action'>
          <Link to='#'>
            <img
              src='/confirm-svgrepo-com.svg'
              alt=''
              onClick={() => handleConfirmOrder(params.row._id)}
            />
          </Link>
        </div>
      ),
    })
  }

  const handleConfirmOrderSwitch = async (orderId, currentIsShipped) => {
    try {
      await axios.put(
        `http://localhost:3000/orders/${orderId}`,
        {
          isShipped: !currentIsShipped,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchData()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }
  const getRowClassName = (params) => {
    const { isShipped, isConfirmed } = params.row
    return isShipped ? 'shipped-row' : 'not-shipped-row'
  }

  const handleClickDelete = async (event, orderId) => {
    event.preventDefault()
    const token = localStorage.getItem('jwt')
    try {
      await axios.delete(`http://localhost:3000/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData((prevData) => prevData.filter((item) => item._id !== orderId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(response.data)
      const allConfirmed = response.data.every((order) => order.isConfirmed)
      setShowActionsColumn(!allConfirmed)
      setIsConfirmed(allConfirmed)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const updatedColumns = [...columns]
  if (!isConfirmed) {
    const shippedColumnIndex = updatedColumns.findIndex(
      (column) => column.field === 'Shipped'
    )
    if (shippedColumnIndex !== -1) {
      updatedColumns.splice(shippedColumnIndex, 1)
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
          getRowClassName={getRowClassName}
          rowHeight={100}
          rows={data}
          columns={updatedColumns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { decouncems: 500 },
            },
          }}
          pageSize={10}
          disableSelectionOnClick
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
