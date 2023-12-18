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
} from '@mui/material'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
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

function HeroDash() {
  const [data, setData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editingCategory, setEditingCategory] = useState({})

  const handleOpenEdit = (category) => {
    setEditingCategory(category)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setEditingCategory({})
  }
  const handleEditChange = (e) => {
    setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('jwt')

    try {
      const response = await axios.put(
        `http://localhost:3000/wilayas/${editingCategory._id}`,
        editingCategory,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      handleCloseEdit()
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editingCategory._id ? { ...response.data } : item
        )
      )
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }
  const columns = [
    { field: 'name', headerName: 'Hero Title', width: 200, editable: true },
    { field: 'price', headerName: 'Description', width: 400, editable: true },
    {
      field: 'image1',
      headerName: 'Main Image',
      width: 100,
      renderCell: (params) => {
        return params.row.image1 && params.row.image1.url ? (
          <div>
            <div>
              <a href={params.row.image1.url} target='_blank'>
                Main{' '}
              </a>
            </div>
          </div>
        ) : (
          <div>No Image</div>
        )
      },
    },

    {
      field: 'image2',
      headerName: 'Main Image',
      width: 100,
      renderCell: (params) => {
        return params.row.image2 && params.row.image1.url ? (
          <div>
            <div>
              <a href={params.row.image1.url} target='_blank'>
                Main{' '}
              </a>
            </div>
          </div>
        ) : (
          <div>No Image</div>
        )
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      renderCell: (params) => (
        <Link to='#' onClick={() => handleOpenEdit(params.row)}>
          <img src='/view.svg' alt='' />
        </Link>
      ),
    },
  ]

  return (
    <div>
      <Button variant='disabled'>Hero</Button>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Fade in={openEdit}>
          <Box sx={style}>
            <Typography id='modal-edit-title' variant='h6'>
              Edit Category
            </Typography>
            <form onSubmit={handleEditSubmit}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  required
                  id='edit-price'
                  name='price'
                  label='Price'
                  type='number'
                  value={editingCategory.price || ''}
                  onChange={handleEditChange}
                />
                <Button type='submit' sx={{ mt: 2 }} variant='contained'>
                  Update
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
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { decounceMs: 500 },
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

export default HeroDash
