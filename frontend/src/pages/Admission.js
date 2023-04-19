import React, { useState, useRef } from 'react'

// Datejs Import
import 'datejs'

// Redux Toolkit Import
import { useDispatch } from 'react-redux'

// Redux Actions Import
import { createClient } from '../redux/actions/clientActions'

// Material UI components
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  colors,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

// Material Icons
import DashboardIcon from '@mui/icons-material/Dashboard'

// Asset import
import profile from '../assets/profile.webp'

const Admission = () => {
  const dispatch = useDispatch()

  const [profileImage, setProfileImage] = useState(profile)
  const [admission, setAdmission] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [marital, setMarital] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [goalWeight, setGoalWeight] = useState('')
  const [lifeStatus, setLifeStatus] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [cnic, setCnic] = useState('')
  const [trainer, setTrainer] = useState('')
  const [gymBefore, setGymBefore] = useState('')
  const [problem, setProblem] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianPhone, setGuardianPhone] = useState('')
  const [relation, setRelation] = useState('')
  const [isAdmissionFeePaidStatus, setIsAdmissionFeePaidStatus] = useState('')
  const [isAdmissionFeePaidAmount, setIsAdmissionFeePaidAmount] = useState(0)

  // Image Uploader
  const hiddenFileInput = useRef(null)
  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }

  const handleChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  // Create Client
  const handleCreateClient = () => {
    const feeReminder = Date.today().addDays(-3).toString('yyyy-MM-d')
    const data = {
      profile: profileImage,
      client: {
        date: admission,
        name,
        gender,
        marital,
        age,
        height,
        weight,
        goalWeight,
        lifeStatus,
        address,
        phone,
        mobile,
        email,
        cnic,
        trainer,
        gymBefore,
        problem,
        guardian: {
          name: guardianName,
          phone: guardianPhone,
          relation,
        },
        isAdmissionFeePaid: {
          status: isAdmissionFeePaidStatus,
          amount: isAdmissionFeePaidAmount,
        },
        feeReminder,
      },
    }
    try {
      dispatch(createClient(data))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box
      sx={{
        padding: '80px 0 80px 65px',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '74px',
          width: '88%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: { xs: '10px', sm: '20px', md: '30px' },
          paddingTop: { xs: '10px', sm: '20px', md: '30px' },
          borderBottom: `2px solid ${colors.lightGreen[700]}`,
        }}
      >
        <Typography variant="h5">Add New Admission</Typography>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: { xs: '90%', sm: '76%', md: '74%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: '300px',
              border: `2px solid ${colors.lightGreen[700]}`,
              marginTop: '20px',
              borderRadius: '20px',
              padding: '15px',
            }}
          >
            <Grid container sx={{ height: '100%', width: '100%' }}>
              <Grid item sx={{ minHeight: '500px', width: '100%' }} xs={12}>
                <Box sx={{ width: '100%', padding: '20px 0' }}>
                  <Grid
                    container
                    sx={{
                      justifyContent: 'center',
                      gap: '15px 0px',
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: 'center', marginBottom: '20px' }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          borderBottom: `2px solid ${colors.lightGreen[700]}`,
                        }}
                      >
                        Client Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <input
                        type="date"
                        className="datePicker"
                        max={Date.today().toString('yyyy-MM-d')}
                        onChange={(e) => setAdmission(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Full Name"
                        required
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControl fullWidth sx={{ width: '94%' }}>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="Gender"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControl fullWidth sx={{ width: '94%' }}>
                        <InputLabel id="demo-simple-select-label">
                          Marital
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={marital}
                          label="Gender"
                          required
                          onChange={(e) => setMarital(e.target.value)}
                        >
                          <MenuItem value={'Single'}>Single</MenuItem>
                          <MenuItem value={'Married'}>Married</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Age"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Height"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Weight"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Goal Weight"
                        helperText="*Required"
                        required
                        sx={{ width: '94%' }}
                        onChange={(e) => setGoalWeight(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl fullWidth sx={{ width: '94%' }}>
                        <InputLabel id="demo-simple-select-label">
                          Life Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={lifeStatus}
                          label="Gender"
                          onChange={(e) => setLifeStatus(e.target.value)}
                        >
                          <MenuItem value={'Student'}>Student</MenuItem>
                          <MenuItem value={'Employed'}>Employed</MenuItem>
                          <MenuItem value={'Business'}>Business</MenuItem>
                          <MenuItem value={'H.Wife'}>H.Wife</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Residential Address"
                        helperText="*Required"
                        sx={{ width: '98%' }}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Phone"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Mobile"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Email"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="CNIC"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setCnic(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControl fullWidth sx={{ width: '94%' }}>
                        <InputLabel id="demo-simple-select-label">
                          Trainer
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={trainer}
                          label="Trainer"
                          required
                          onChange={(e) => setTrainer(e.target.value)}
                        >
                          <MenuItem value={'Yes'}>Yes</MenuItem>
                          <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControl fullWidth sx={{ width: '94%' }}>
                        <InputLabel id="demo-simple-select-label">
                          Gym Before?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gymBefore}
                          label="Gym Before?"
                          required
                          onChange={(e) => setGymBefore(e.target.value)}
                        >
                          <MenuItem value={'Yes'}>Yes</MenuItem>
                          <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Physical Problem"
                        required
                        onChange={(e) => setProblem(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: 'center', marginBottom: '20px' }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          borderBottom: `2px solid ${colors.lightGreen[700]}`,
                        }}
                      >
                        Guardian Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Guardian Name"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setGuardianName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Guardian Phone"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setGuardianPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Relation"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) => setRelation(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: 'center', marginBottom: '20px' }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          borderBottom: `2px solid ${colors.lightGreen[700]}`,
                        }}
                      >
                        Admission Fee
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Amount"
                        helperText="*Required"
                        sx={{ width: '94%' }}
                        required
                        onChange={(e) =>
                          setIsAdmissionFeePaidAmount(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ width: '94%' }}>
                        <InputLabel id="demo-simple-select-label">
                          Payment Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={isAdmissionFeePaidStatus}
                          label="Fee Paid"
                          required
                          onChange={(e) =>
                            setIsAdmissionFeePaidStatus(e.target.value)
                          }
                        >
                          <MenuItem value={'Paid'}>Paid</MenuItem>
                          <MenuItem value={'Unpaid'}>Unpaid</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={profileImage}
                        style={{ height: '100px' }}
                        alt="profile"
                      />
                      <Button
                        onClick={handleClick}
                        variant="contained"
                        color="success"
                        sx={{ marginLeft: '30px' }}
                      >
                        Upload a file
                      </Button>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'flex',
              },
              border: `2px solid ${colors.lightGreen[700]}`,
              marginTop: '40px',
              borderRadius: '20px',
              padding: '14px 30px',
              '& .MuiGrid-item': {
                padding: 0,
              },
              justifyContent: 'center',
            }}
          >
            <Grid
              container
              sx={{
                width: '100%',
                overflow: {
                  xs: 'scroll',
                  md: 'hidden',
                },
              }}
            >
              <Grid item xs={12} sx={{ display: 'flex', height: '230px' }}>
                <Box
                  sx={{
                    height: '220px',
                    width: '65%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h3">BEING STRONG</Typography>
                  <Typography variant="h5">FITNESS CLUB</Typography>
                </Box>
                <Box sx={{ width: '35%', height: '230px' }}>
                  <List
                    sx={{
                      width: '100%',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItem>
                      <ListItemIcon>
                        <DashboardIcon sx={{ fontSize: '24px' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="body2">03123456789</Typography>
                            <Typography variant="body2">03123456789</Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem sx={{ marginTop: '-14px' }}>
                      <ListItemIcon>
                        <DashboardIcon sx={{ fontSize: '24px' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            beingstrong@gmail.com
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem sx={{ marginTop: '-10px' }}>
                      <ListItemIcon>
                        <DashboardIcon sx={{ fontSize: '24px' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">Instagram</Typography>
                        }
                      />
                    </ListItem>
                    <ListItem sx={{ marginTop: '-10px' }}>
                      <ListItemIcon>
                        <DashboardIcon sx={{ fontSize: '24px' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            They don't have directional arrows; instead, they
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ textAlign: 'center', marginBottom: '20px' }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: `2px solid ${colors.lightGreen[700]}`,
                  }}
                >
                  Client Information
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '25px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">Full Name : </Typography>
                  <Box
                    sx={{
                      minWidth: '280px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {name}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Gender : </Typography>
                  <Box
                    sx={{
                      minWidth: '140px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {gender}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Marital : </Typography>
                  <Box
                    sx={{
                      minWidth: '140px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {marital}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '15px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">Age : </Typography>
                  <Box
                    sx={{
                      minWidth: '80px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {age}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Height : </Typography>
                  <Box
                    sx={{
                      minWidth: '100px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {height}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Weight : </Typography>
                  <Box
                    sx={{
                      minWidth: '80px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {weight}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Goal Weight : </Typography>
                  <Box
                    sx={{
                      minWidth: '80px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {goalWeight}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Status : </Typography>
                  <Box
                    sx={{
                      minWidth: '100px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {lifeStatus}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '15px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">
                    Residential Address :
                  </Typography>
                  <Box
                    sx={{
                      width: '800px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {address}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '15px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">Phone : </Typography>
                  <Box
                    sx={{
                      minWidth: '200px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {phone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Mobile : </Typography>
                  <Box
                    sx={{
                      minWidth: '200px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {mobile}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Email : </Typography>
                  <Box
                    sx={{
                      minWidth: '300px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '15px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">CNIC : </Typography>
                  <Box
                    sx={{
                      minWidth: '280px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {cnic}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Trainer : </Typography>
                  <Box
                    sx={{
                      minWidth: '120px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {trainer}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">
                    Have you been gym before? :{' '}
                  </Typography>
                  <Box
                    sx={{
                      minWidth: '120px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {gymBefore}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '15px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">
                    Physical / Medical Problem :
                  </Typography>
                  <Box
                    sx={{
                      width: '750px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {problem}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '15px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">
                    Note : Gym staff will not be responsible for any health
                    problem arising from training during exercises!
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ textAlign: 'center', marginBottom: '20px' }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: `2px solid ${colors.lightGreen[700]}`,
                  }}
                >
                  Guardian Information
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '25px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">Guardian Name : </Typography>
                  <Box
                    sx={{
                      minWidth: '240px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {guardianName}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Phone : </Typography>
                  <Box
                    sx={{
                      minWidth: '200px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {guardianPhone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Relation : </Typography>
                  <Box
                    sx={{
                      minWidth: '180px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {relation}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ textAlign: 'center', padding: '0 15px' }}>
                  <Typography variant="body2">
                    I abide by the rules and regulations of the gym and I agree
                    all the instructions given by the authorities for the
                    discipline of the gym. I understood that all the payments
                    are non-refundable / non-transferable under any
                    circumstances.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  height: '80px',
                  marginTop: '30px',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">Date : </Typography>
                  <Box
                    sx={{
                      minWidth: '300px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {admission}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '25px' }}>
                  <Typography variant="subtitle1">Signature : </Typography>
                  <Box
                    sx={{
                      minWidth: '300px',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                      height: '30px',
                      marginLeft: '15px',
                    }}
                  ></Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '15px' }}>
            <Button
              variant="contained"
              color="success"
              sx={{ width: '65%' }}
              onClick={handleCreateClient}
            >
              Submit & Print
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Admission
