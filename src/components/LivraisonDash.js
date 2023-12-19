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
import { API_ENDPOINT } from '../config'
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
        `${API_ENDPOINT}/wilayas/${editingCategory._id}`,
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

  const columns = [
    { field: 'name', headerName: 'Wilayas', width: 200, editable: true },
    { field: 'price', headerName: 'Price', width: 80, editable: true },

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
      <Button variant='disabled'>Livraisons</Button>
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
