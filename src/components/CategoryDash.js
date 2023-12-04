import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  Modal,
  Box,
  Fade,
  Backdrop,
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
  const [category, setCategory] = useState('')
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
        `http://localhost:3000/categories/${editingCategory._id}`,
        editingCategory,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log('Category updated:', response.data)
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
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleClickDelete = async (event, id) => {
    event.preventDefault()
    const token = localStorage.getItem('jwt')
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData((prevData) => prevData.filter((item) => item._id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 200, editable: true },

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
          <Link to='#' onClick={() => handleOpenEdit(params.row)}>
            <img src='/view.svg' alt='' />
          </Link>
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
  const handleInputChange = (event) => {
    setCategory(event.target.value)
  }
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories/')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = { name: category }
    const token = localStorage.getItem('jwt')

    axios
      .post('http://localhost:3000/categories/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data)
        handleClose()
        setCategory('')
        setData((prevData) => [response.data, ...prevData])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  return (
    <div>
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
                  id='edit-name'
                  name='name'
                  label='Name'
                  type='text'
                  value={editingCategory.name || ''}
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
      <Button variant='contained' onClick={handleOpen}>
        Add Category
      </Button>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='modal-title' variant='h6'>
              Add Category
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  required
                  id='name'
                  label='Name'
                  type='text'
                  value={category}
                  onChange={handleInputChange}
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
