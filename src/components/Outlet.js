import { React, useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import '../Styling/Outlet.scss'
import axios from 'axios'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { API_ENDPOINT } from '../config'
import {
  Modal,
  Box,
  Fade,
  Button,
  Typography,
  FormControl,
  TextField,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DataGridDemo() {
  const style = {
    position: 'absolute',
    overflow: 'scroll',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
  }
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'marque',
      headerName: 'Marque',
      width: 150,
      editable: false,
    },
    {
      field: 'category',
      type: 'string',
      headerName: 'Category',
      width: 100,
      editable: false,
      renderCell: (params) => <span>{params.row.category.name}</span>,
    },
    {
      field: 'sexe',
      type: 'string',
      headerName: 'Gender',
      width: 100,
      editable: false,
    },
    {
      field: 'season',
      type: 'string',
      headerName: 'Saison',
      width: 100,
      editable: false,
    },
    {
      field: 'prices',
      headerName: 'Price',
      type: 'number',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const priceList = params.row.prices
          .map((p) => `${p.type}: $${p.price}`)
          .join(', ')
        return (
          <div
            style={{
              whiteSpace: 'normal',
              lineHeight: 'normal',
              wordWrap: 'break-word',
              overflow: 'auto', // Enables scrolling
              maxHeight: '50px', // Set a maximum height for the cell
            }}
          >
            {params.row.prices.map((p, index) => (
              <div key={index}>
                {p.type}: {p.price}DA
              </div>
            ))}
          </div>
        )
      },
    },
    {
      field: 'descriptions',
      headerName: 'Description',
      type: 'string',
      width: 300,
      editable: false,
      renderCell: (params) => {
        const descriptions = params.row.descriptions
          .map((desc) => `${desc.language.toUpperCase()}: ${desc.text}`)
          .join(' | ')
        return (
          <div
            style={{
              whiteSpace: 'normal',
              lineHeight: 'normal',
              wordWrap: 'break-word',
              overflow: 'auto',
              maxHeight: '60px',
            }}
          >
            {params.row.descriptions.map((desc) => (
              <div key={desc._id}>
                {desc.language.toUpperCase()}: {desc.text}
              </div>
            ))}
          </div>
        )
      },
    },
    {
      field: 'image1',
      headerName: 'Main Image',
      width: 100,
      renderCell: (params) => {
        return params.row.image1 && params.row.image1.url ? (
          <div>
            <div>
              <a href={params.row.image1.url} target='_blank'>
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
      field: 'image2',
      headerName: 'Secondary Image',
      width: 100,
      renderCell: (params) => {
        return params.row.image2 && params.row.image2.url ? (
          <div>
            <div>
              <a href={params.row.image2.url} target='_blank'>
                Secondary{' '}
              </a>
            </div>
          </div>
        ) : (
          <div>No Image</div>
        )
      },
    },

    {
      field: 'isFeatured',
      headerName: 'isFeatured',
      width: 80,
      type: 'boolean',
    },

    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 80,
      type: 'boolean',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      type: 'string',
      renderCell: (params) => {
        const date = new Date(params.row.createdAt)
        const formattedDate = date.toLocaleDateString()
        return <span>{formattedDate}</span>
      },
    },
    {
      field: 'acions',
      headerName: 'Actions',
      width: 80,
      renderCell: (params) => {
        const handleClickmodify = (event) => {
          event.preventDefault()
        }
        return (
          <div className='action'>
            <Link to='#' onClick={() => handleOpenEdit(params.row)}>
              <img src='/view.svg' alt='' />
            </Link>
            <Link to='#' onClick={() => handleDelete(params.row._id)}>
              <img src='/delete.svg' alt='' />
            </Link>
          </div>
        )
      },
    },
  ]

  const [open, setOpen] = useState(false)
  const [totalPages, setTotalPages] = useState(1) // New state for total pages
  const [totalProducts, setTotalProducts] = useState(0) // New state for total pages
  const [currentPage, setCurrentPage] = useState(1) // New state for current page
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [category, setCategory] = useState('')
  const [dynamicFields, setDynamicFields] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editingItem, setEditingItem] = useState({
    name: '',
    category: { _id: '', name: '' },
    prices: [],
    descriptions: [],
    sexe: '',
    season: '',
    inStock: true,
    isFeatured: false,
    image1: '',
    image2: '',
  })
  const [newProductName, setNewProductName] = useState('')
  const [newMarqueName, setNewMarqueName] = useState('')
  const [newProductCategory, setNewProductCategory] = useState({})
  const [newProductPrices, setNewProductPrices] = useState([])
  const [newProductGender, setNewProductGender] = useState('')
  const [newProductSeason, setNewProductSeason] = useState('')
  const [newProductDescriptionEN, setNewProductDescriptionEN] = useState('')
  const [newProductDescriptionAR, setNewProductDescriptionAR] = useState('')
  const [newProductDescriptionFR, setNewProductDescriptionFR] = useState('')
  const [newProductImage1, setNewProductImage1] = useState(null)
  const [newProductImage2, setNewProductImage2] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleInputChange = (event) => {
    setCategory(event.target.value)
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // fetchData(newPage)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
    setEditingItem({})
  }
  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value })
  }
  const handleEditChangech = (e) => {
    const { name, value, type, checked } = e.target
    setEditingItem({
      ...editingItem,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('jwt')
    let newImage1Url = editingItem.image1
    let newImage2Url = editingItem.image2

    if (editingItem.newImage1) {
      const uploadedImage1 = await uploadFile(editingItem.newImage1)
      newImage1Url = uploadedImage1
        ? uploadedImage1.file._id
        : editingItem.image1
    }

    if (editingItem.newImage2) {
      const uploadedImage2 = await uploadFile(editingItem.newImage2)
      newImage2Url = uploadedImage2
        ? uploadedImage2.file._id
        : editingItem.image2
    }

    const updatedItem = {
      name: editingItem.name,
      marque: editingItem.marque,
      category: editingItem.category._id,
      prices: editingItem.prices,
      sexe: editingItem.sexe,
      season: editingItem.season,
      inStock: editingItem.inStock,
      isFeatured: editingItem.isFeatured,
      image1: newImage1Url,
      image2: newImage2Url,
    }

    try {
      const response = await axios.put(
        `${API_ENDPOINT}/products/${editingItem._id}`,
        updatedItem,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      handleCloseEdit()

      setData((prevData) =>
        prevData.map((item) =>
          item._id === editingItem._id ? { ...response.data } : item
        )
      )
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/products?limit=200`)
      setData(response.data.products)
      setTotalProducts(response.data.totalProducts)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData2 = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/categories/`)
      setData2(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData2()
  }, [])
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value

    const selectedCategory = data2.find(
      (cat) => cat._id === selectedCategoryId
    ) || { _id: '', name: '' }
    setEditingItem({ ...editingItem, category: selectedCategory })
  }
  const token = localStorage.getItem('jwt')
  const handleDelete = async (id) => {
    try {
      await axios.put(
        `${API_ENDPOINT}/products/${id}`,
        {
          isDrafted: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setData(data.filter((item) => item._id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  const handlePriceVolumeChange = (index, event, field) => {
    const newPrices = [...editingItem.prices]
    newPrices[index] = {
      ...newPrices[index],
      [field]: event.target.value,
    }
    setEditingItem({ ...editingItem, prices: newPrices })
  }
  const handlePriceVolumeNew = (index, event, field) => {
    const updatedPrices = [...newProductPrices]
    updatedPrices[index] = {
      ...updatedPrices[index],
      [field]: event.target.value,
    }
    setNewProductPrices(updatedPrices)
  }

  const getDescriptionByLanguage = (language) => {
    const descriptionObj = editingItem.descriptions.find(
      (desc) => desc.language.toUpperCase() === language.toUpperCase()
    )
    return descriptionObj ? descriptionObj.text : ''
  }
  const handleDescriptionChange = (event, language) => {
    const newDescriptions = editingItem.descriptions.map((desc) =>
      desc.language.toUpperCase() === language.toUpperCase()
        ? { ...desc, text: event.target.value }
        : desc
    )

    setEditingItem({ ...editingItem, descriptions: newDescriptions })
  }
  const addNewPriceVolumePair = () => {
    setNewProductPrices([...newProductPrices, { type: '', price: '' }])
  }

  const removePriceVolumePair = (index) => {
    const updatedPrices = newProductPrices.filter((_, i) => i !== index)
    setNewProductPrices(updatedPrices)
  }

  const handleGenderChange = (event) => {
    setNewProductGender(event.target.value)
  }

  const handleSeasonChange = (event) => {
    setNewProductSeason(event.target.value)
  }

  const handleDescriptionENChange = (event) => {
    setNewProductDescriptionEN(event.target.value)
  }

  const handleDescriptionARChange = (event) => {
    setNewProductDescriptionAR(event.target.value)
  }

  const handleDescriptionFRChange = (event) => {
    setNewProductDescriptionFR(event.target.value)
  }

  const handleNewProductNameChange = (event) =>
    setNewProductName(event.target.value)
  const handleNewMarqueNameChange = (event) =>
    setNewMarqueName(event.target.value)
  const handleNewProductCategoryChange = (event) => {
    const selectedCategory =
      data2.find((cat) => cat._id === event.target.value) || {}
    setNewProductCategory(selectedCategory)
  }
  const handleImage1Change = (event) => {
    setNewProductImage1(event.target.files[0])
  }

  const handleImage2Change = (event) => {
    setNewProductImage2(event.target.files[0])
  }
  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(`${API_ENDPOINT}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const image1Url = newProductImage1
      ? await uploadFile(newProductImage1)
      : null
    const image2Url = newProductImage2
      ? await uploadFile(newProductImage2)
      : null

    const formData = {
      name: newProductName,
      marque: newMarqueName,
      category: newProductCategory,
      prices: newProductPrices,
      sexe: newProductGender,
      season: newProductSeason,
      descriptions: [
        { language: 'EN', text: newProductDescriptionEN },
        { language: 'AR', text: newProductDescriptionAR },
        { language: 'FR', text: newProductDescriptionFR },
      ],
      image1: image1Url.file._id,
      image2: image2Url.file._id,
    }

    try {
      const response = await axios.post(`${API_ENDPOINT}/products/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Reset state variables after adding the product
      setNewProductName('')
      setNewMarqueName('')

      setNewProductCategory({})
      setNewProductPrices([])
      setNewProductGender('')
      setNewProductSeason('')
      setNewProductDescriptionEN('')
      setNewProductDescriptionAR('')
      setNewProductDescriptionFR('')
      setNewProductImage1(null)
      setNewProductImage2(null)
      handleClose()
      setData((prevData) => [...prevData, response.data])
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Add Product
      </Button>
      <Modal open={openEdit} onClose={handleCloseEdit} closeAfterTransition>
        <Fade in={openEdit}>
          <Box sx={style}>
            <Typography id='modal-title' variant='h6'>
              Edit Product
            </Typography>
            <form onSubmit={handleEditSubmit}>
              {/* Name Field */}
              <TextField
                required
                id='name'
                name='name'
                label='Name'
                type='text'
                value={editingItem.name || ''}
                onChange={handleEditChange}
                fullWidth
                margin='normal'
              />
              <TextField
                id='marque'
                name='marque'
                label='Marque'
                type='text'
                value={editingItem.marque || ''}
                onChange={handleEditChange}
                fullWidth
                margin='normal'
              />
              <FormControl fullWidth margin='normal'>
                {/* <InputLabel htmlFor='image1-upload'>Main Image</InputLabel> */}
                <input
                  id='image1-upload'
                  type='file'
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      newImage1: e.target.files[0],
                    })
                  }
                />
              </FormControl>
              <FormControl fullWidth margin='normal'>
                {/* <InputLabel htmlFor='image2-upload'>Secondary Image</InputLabel> */}
                <input
                  id='image2-upload'
                  type='file'
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      newImage2: e.target.files[0],
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth margin='normal'>
                <InputLabel id='category-label'>Category</InputLabel>
                <Select
                  labelId='category-label'
                  id='category'
                  name='category'
                  value={editingItem.category?._id || ''}
                  label='Category'
                  onChange={handleCategoryChange}
                >
                  {data2.map((categoryItem) => (
                    <MenuItem key={categoryItem._id} value={categoryItem._id}>
                      {categoryItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {editingItem.prices &&
                editingItem.prices.map((price, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={5}>
                      <TextField
                        required
                        value={price.type}
                        label='Volume'
                        type='text'
                        fullWidth
                        margin='normal'
                        onChange={(e) =>
                          handlePriceVolumeChange(index, e, 'type')
                        }
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        required
                        value={price.price}
                        label='Price'
                        type='number'
                        fullWidth
                        margin='normal'
                        onChange={(e) =>
                          handlePriceVolumeChange(index, e, 'price')
                        }
                      />
                    </Grid>
                  </Grid>
                ))}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editingItem.isFeatured || false}
                    onChange={handleEditChangech}
                    name='isFeatured'
                  />
                }
                label='Is Featured'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editingItem.inStock || false}
                    onChange={handleEditChangech}
                    name='inStock'
                  />
                }
                label='In Stock'
              />
              <FormControl component='fieldset' margin='normal'>
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup
                  row
                  name='sexe'
                  value={editingItem.sexe || ''}
                  onChange={handleEditChange}
                >
                  <FormControlLabel
                    value='Women'
                    control={<Radio />}
                    label='Women'
                  />
                  <FormControlLabel
                    value='Men'
                    control={<Radio />}
                    label='Men'
                  />
                  <FormControlLabel
                    value='Unisex'
                    control={<Radio />}
                    label='Unisex'
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component='fieldset' margin='normal'>
                <FormLabel component='legend'>Season</FormLabel>
                <RadioGroup
                  row
                  name='season'
                  value={editingItem.season || ''}
                  onChange={handleEditChange}
                >
                  <FormControlLabel
                    value='Winter'
                    control={<Radio />}
                    label='Winter'
                  />
                  <FormControlLabel
                    value='Spring'
                    control={<Radio />}
                    label='Spring'
                  />
                  <FormControlLabel
                    value='Summer'
                    control={<Radio />}
                    label='Summer'
                  />
                  <FormControlLabel
                    value='Autumn'
                    control={<Radio />}
                    label='Autumn'
                  />
                </RadioGroup>
              </FormControl>
              <Button type='submit' variant='contained' sx={{ mt: 2 }}>
                Update
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='modal-title' variant='h6'>
              Add Product
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  required
                  id='name'
                  name='name'
                  label='Name'
                  type='text'
                  value={newProductName}
                  onChange={handleNewProductNameChange}
                />{' '}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    id='marque'
                    name='marque'
                    label='Marque'
                    type='text'
                    value={newMarqueName}
                    onChange={handleNewMarqueNameChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField type='file' onChange={handleImage1Change} />{' '}
                </FormControl>{' '}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField type='file' onChange={handleImage2Change} />{' '}
                </FormControl>
                <Box sx={{ minWidth: 120, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={newProductCategory._id || ''}
                      label='Category'
                      onChange={handleNewProductCategoryChange}
                    >
                      {data2.map((categoryItem) => (
                        <MenuItem
                          key={categoryItem._id}
                          value={categoryItem._id}
                        >
                          {categoryItem.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                {newProductPrices.map((field, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={5}>
                      <TextField
                        required
                        value={field.type}
                        label='Volume'
                        type='text'
                        fullWidth
                        margin='normal'
                        onChange={(e) => handlePriceVolumeNew(index, e, 'type')}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        required
                        value={field.price}
                        label='Price'
                        type='number'
                        fullWidth
                        margin='normal'
                        onChange={(e) =>
                          handlePriceVolumeNew(index, e, 'price')
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => removePriceVolumePair(index)}
                        sx={{ marginTop: '25px' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  onClick={addNewPriceVolumePair}
                  variant='contained'
                  sx={{ mt: 2 }}
                >
                  Add Price and Volume
                </Button>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='gender-radio-buttons-group-label'
                    name='gender-radio-buttons-group'
                    value={newProductGender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value='Women'
                      control={<Radio />}
                      label='Women'
                    />
                    <FormControlLabel
                      value='Men'
                      control={<Radio />}
                      label='Men'
                    />
                    <FormControlLabel
                      value='Unisex'
                      control={<Radio />}
                      label='Unisex'
                    />
                  </RadioGroup>
                </FormControl>
                <FormLabel component='legend'>Seasons</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='season-radio-buttons-group-label'
                  name='season-radio-buttons-group'
                  value={newProductSeason}
                  onChange={handleSeasonChange}
                >
                  <FormControlLabel
                    value='Winter'
                    control={<Radio />}
                    label='Winter'
                  />
                  <FormControlLabel
                    value='Spring'
                    control={<Radio />}
                    label='Spring'
                  />
                  <FormControlLabel
                    value='Summer'
                    control={<Radio />}
                    label='Summer'
                  />
                  <FormControlLabel
                    value='Autumn'
                    control={<Radio />}
                    label='Autumn'
                  />
                </RadioGroup>
                {/* Description Fields */}
                <BaseTextareaAutosize
                  minRows={1}
                  placeholder='Description-EN'
                  value={newProductDescriptionEN}
                  onChange={handleDescriptionENChange}
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
                <BaseTextareaAutosize
                  minRows={1}
                  placeholder='Description-AR'
                  value={newProductDescriptionAR}
                  onChange={handleDescriptionARChange}
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
                <BaseTextareaAutosize
                  minRows={1}
                  placeholder='Description-FR'
                  value={newProductDescriptionFR}
                  onChange={handleDescriptionFRChange}
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
          rows={data}
          rowHeight={100}
          getRowId={(row) => row._id}
          columns={columns}
          // pageSize={10}
          // pagination
          rowCount={totalProducts}
          // page={currentPage}
          // onPageChange={(params) => handlePageChange(params.page)}
          // paginationMode='server'
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { decouncems: 500 },
            },
          }}
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
