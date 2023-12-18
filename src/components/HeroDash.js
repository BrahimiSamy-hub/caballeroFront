import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
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
  const token = localStorage.getItem('jwt')
  const [editingCategory, setEditingCategory] = useState({
    arTitle: '',
    frTitle: '',
    enTitle: '',
    arDesc: '',
    frDesc: '',
    enDesc: '',
    newMainImage: null,
    newSecondaryImage: null,
  })
  const handleOpenEdit = (category) => {
    setEditingCategory(category)
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
    setEditingCategory({
      arTitle: '',
      frTitle: '',
      enTitle: '',
      arDesc: '',
      frDesc: '',
      enDesc: '',
      newMainImage: null,
      newSecondaryImage: null,
    })
  }
  // console.log(data)
  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(
        'http://localhost:3000/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/heros', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(response.data)
      // console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
    console.log('data', data)
  }, [])
  const handleEditChange = (e) => {
    setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value })
  }

  const handleImageChange = (fieldName, file) => {
    setEditingCategory({ ...editingCategory, [fieldName]: file })
  }
  const handleEditSubmit = async (event) => {
    event.preventDefault()

    let newMainImageUrl =
      editingCategory.mainImage && editingCategory.mainImage.url
    let newSecondaryImageUrl =
      editingCategory.secondaryImage && editingCategory.secondaryImage.url

    if (editingCategory.newMainImage) {
      const uploadedMainImage = await uploadFile(editingCategory.newMainImage)
      newMainImageUrl = uploadedMainImage
        ? uploadedMainImage.file._id
        : editingCategory.mainImage
    }

    if (editingCategory.newSecondaryImage) {
      const uploadedSecondaryImage = await uploadFile(
        editingCategory.newSecondaryImage
      )
      newSecondaryImageUrl = uploadedSecondaryImage
        ? uploadedSecondaryImage.file._id
        : editingCategory.secondaryImage
    }

    const updatedItem = {
      arTitle: editingCategory.arTitle,
      frTitle: editingCategory.frTitle,
      enTitle: editingCategory.enTitle,
      arDesc: editingCategory.arDesc,
      frDesc: editingCategory.frDesc,
      enDesc: editingCategory.enDesc,
      mainImage: newMainImageUrl,
      secondaryImage: newSecondaryImageUrl,
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/heros/${editingCategory._id}`,
        updatedItem,
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
    {
      field: 'arTitle',
      headerName: 'Hero Title Arabe',
      width: 200,
      editable: false,
      key: 'arTitle',
    },
    {
      field: 'frTitle',
      headerName: 'Hero Title French',
      width: 200,
      editable: false,
    },
    {
      field: 'enTitle',
      headerName: 'Hero Title English',
      width: 200,
      editable: false,
    },
    {
      field: 'arDesc',
      headerName: 'Description Arabe ',
      width: 400,
      editable: false,
    },
    {
      field: 'frDesc',
      headerName: 'Description French',
      width: 400,
      editable: false,
    },
    {
      field: 'enDesc',
      headerName: 'Description English',
      width: 400,
      editable: false,
    },
    {
      field: 'mainImage',
      headerName: 'Main Image',
      width: 100,
      renderCell: (params) => {
        return params.row.mainImage && params.row.mainImage.url ? (
          <div>
            <div>
              <a href={params.row.mainImage.url} target='_blank'>
                Main
              </a>
            </div>
          </div>
        ) : (
          <div>No Image</div>
        )
      },
    },

    {
      field: 'secondaryImage',
      headerName: 'Secondary Image',
      width: 100,
      renderCell: (params) => {
        return params.row.secondaryImage && params.row.secondaryImage.url ? (
          <div>
            <div>
              <a href={params.row.secondaryImage.url} target='_blank'>
                Secondary
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
              <FormControl fullWidth margin='normal'>
                <input
                  id='image1-upload'
                  type='file'
                  onChange={(e) =>
                    handleImageChange('newMainImage', e.target.files[0])
                  }
                />
              </FormControl>
              <FormControl fullWidth margin='normal'>
                <input
                  id='image2-upload'
                  type='file'
                  onChange={(e) =>
                    handleImageChange('newSecondaryImage', e.target.files[0])
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  required
                  id='edit-arTitle'
                  name='arTitle'
                  label='Arabic Title'
                  type='text'
                  value={editingCategory.arTitle || ''}
                  onChange={handleEditChange}
                />
                <TextField
                  required
                  id='edit-frTitle'
                  name='frTitle'
                  label='French Title'
                  type='text'
                  value={editingCategory.frTitle || ''}
                  onChange={handleEditChange}
                />
                <TextField
                  required
                  id='edit-enTitle'
                  name='enTitle'
                  label='English Title'
                  type='text'
                  value={editingCategory.enTitle || ''}
                  onChange={handleEditChange}
                />
                <TextField
                  required
                  id='edit-arDesc'
                  name='arDesc'
                  label='Arabic Description'
                  type='text'
                  value={editingCategory.arDesc || ''}
                  onChange={handleEditChange}
                />
                <TextField
                  required
                  id='edit-frDesc'
                  name='frDesc'
                  label='French Description'
                  type='text'
                  value={editingCategory.frDesc || ''}
                  onChange={handleEditChange}
                />
                <TextField
                  required
                  id='edit-enDesc'
                  name='enDesc'
                  label='English Description'
                  type='text'
                  value={editingCategory.enDesc || ''}
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
