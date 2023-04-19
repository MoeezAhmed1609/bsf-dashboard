import React, { useState, useEffect } from 'react'

// Redux Toolkit Import
import { useSelector, useDispatch } from 'react-redux'

// Datejs Import
import 'datejs'

// Redux Actions Import
import {
  getClientDetails,
  updateClientFees,
  updateClientStatus,
} from '../redux/actions/clientActions'

// React Router Dom Import
import { useParams } from 'react-router-dom'

// Material UI components
import {
  Box,
  colors,
  Grid,
  Typography,
  Button,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material'

const ClientProfile = () => {
  const dispatch = useDispatch()
  // Getting sales from redux state
  const { client } = useSelector((state) => state.clientDetail)
  const profile = client?.client
  const [paidDate, setPaidDate] = useState('')
  const [amount, setAmount] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [status, setStatus] = useState('')

  const data = [
    {
      title: 'Admission Date',
      value: profile?.date,
    },
    {
      title: 'Height',
      value: profile?.height,
    },
    {
      title: 'Weight',
      value: profile?.weight,
    },
    {
      title: 'Goal Weight',
      value: profile?.goalWeight,
    },
    {
      title: 'Life Status',
      value: profile?.lifeStatus,
    },
    {
      title: 'Residential Address',
      value: profile?.address,
    },
    {
      title: 'Phone',
      value: profile?.phone,
    },
    {
      title: 'Mobile',
      value: profile?.mobile,
    },
    {
      title: 'Email',
      value: profile?.email,
    },
    {
      title: 'CNIC',
      value: profile?.cnic,
    },
    {
      title: 'Guardian Name',
      value: profile?.guardian?.name,
    },
    {
      title: 'Guardian Phone',
      value: profile?.guardian?.phone,
    },
    {
      title: 'Guardian Relation',
      value: profile?.guardian?.relation,
    },
    {
      title: 'Need Trainer?',
      value: profile?.trainer,
    },
    {
      title: 'Have been gym before?',
      value: profile?.gymBefore,
    },
    {
      title: 'Physical Problem',
      value: profile?.problem,
    },
    {
      title: 'Admission Fee Paid',
      value: profile?.isAdmissionFeePaid?.amount,
    },
  ]

  const params = useParams()

  // Change Status
  const handleChangeStatus = async () => {
    let status = profile?.status === 'Active' ? 'Non Active' : 'Active'
    let data = {
      id: profile?._id,
      status,
    }
    new Promise((resolve, reject) => {
      resolve(dispatch(updateClientStatus(data)))
    }).then(() => window.location.reload())
  }

  const length = profile?.fees?.length
    const fee = new Date(profile?.fees[length - 1]?.feeDate)

    const feeReminder = Date.parse(fee).addMonths(2).addDays(-3).toString('yyyy-MM-d')
    console.log(feeReminder)

  // Handle Fee Payment
  const handleFeePayment = () => {
    const balanceAmount = amount - paidAmount
    const length = profile?.fees?.length

    const feeReminder = profile?.fees?.length > 0 ? Date.parse(fee).addMonths(2).addDays(-3).toString('yyyy-MM-d') : Date.parse(profile?.date).addMonths(1).addDays(-3).toString('yyyy-MM-d')

    const feeDate =
      profile?.fees?.length > 0
        ? Date.parse(profile?.fees[length - 1]?.feeDate).addMonths(1).toString('yyyy-MM-d')
        : profile?.date

    const updateFeeData = {
      status,
      feeDate,
      paidDate,
      amount,
      paidAmount,
      balanceAmount,
    }
    const data = {
      id: profile?._id,
      updateFeeData,
      feeReminder,
      lastFeePaidDate: paidDate,
    }

    new Promise((resolve, reject) => {
      resolve(dispatch(updateClientFees(data)))
    }).then(() => window.location.reload())
  }

  useEffect(() => {
    dispatch(getClientDetails(params.id))
  }, [dispatch, params.id])

  return (
    <Box
      sx={{
        padding: '80px 0 80px 65px',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          minHeight: '500px',
          width: { xs: '90%', sm: '80%', md: '70%' },
          display: 'flex',
          mt: 5,
          border: `2px solid ${colors.lightGreen[700]}`,
          borderRadius: '20px',
          padding: {
            xs: '8px',
            sm: '18px',
            md: '25px',
          },
        }}
      >
        <Grid container sx={{ height: 'auto' }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box sx={{
             
              height: '200px',
              width: {
                xs: '60%',
                sm: '97%'
              },
              
              border: `2px solid ${colors.lightGreen[700]}`,
              backgroundImage: `url(${profile?.profile?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            sx={{
              width: '80%',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '25px',
              marginTop: {
                xs: '15px',
                sm: '0',
              },
            }}
          >
            <Typography variant="h3">{profile?.name}</Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'normal', paddingLeft: '10px' }}
            >
              {profile?.gender}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'normal', paddingLeft: '10px' }}
            >
              {profile?.age}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'normal', paddingLeft: '10px' }}
            >
              {profile?.marital}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              display: 'flex',
              minHeight: '100px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '40px',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <span
                style={{
                  height: '10px',
                  width: '10px',
                  borderRadius: '100%',
                  backgroundColor:
                    profile?.status === 'Active' ? 'green' : 'red',
                  marginRight: '10px',
                }}
              ></span>
              <Typography variant="subtitle1">{profile?.status}</Typography>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ marginLeft: '10px' }}
                onClick={handleChangeStatus}
              >
                {profile?.status === 'Active' ? 'Non Active' : 'Active'}
              </Button>
            </Box>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{
                marginBottom: '20px',
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'flex',
                },
              }}
            >
              Print Profile
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'flex',
                },
              }}
            >
              Print Summary
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ margin: '20px 0' }}>
            <Typography
              variant="h6"
              sx={{
                borderBottom: `2px solid ${colors.lightGreen[700]}`,
              }}
            >
              Client Information
            </Typography>
          </Grid>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '50%' }} align="center">
                    Title
                  </TableCell>
                  <TableCell sx={{ width: '50%' }} align="center">
                    Information
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((client, index) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {client.title}
                    </TableCell>
                    <TableCell align="center">{client.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item xs={12} sx={{ margin: '20px 0' }}>
            <Typography
              variant="h6"
              sx={{
                borderBottom: `2px solid ${colors.lightGreen[700]}`,
              }}
            >
              Fees Details
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: '20px' }}></Grid>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Fee Date</TableCell>
                  <TableCell align="right">Paid Date</TableCell>
                  <TableCell align="right">Paid Amount</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profile?.fees?.map((fee) => (
                  <TableRow
                    key={fee._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {fee?.month}
                    </TableCell>
                    <TableCell align="right">{fee?.feeDate}</TableCell>
                    <TableCell align="right">{fee?.paidDate}</TableCell>
                    <TableCell align="right">{fee?.paidAmount}</TableCell>
                    <TableCell align="right">{fee?.balanceAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
      <Grid
        container
        sx={{
          height: '100%',
          width: { xs: '96%', sm: '88%', md: '80%' },
          marginTop: '40px',
        }}
      >
        <Grid item sx={{ height: '220px', width: '100%' }} xs={12}>
          <Box
            sx={{
              width: '100%',
              padding: '10px 0',
            }}
          >
            <Typography variant="subtitle2">
              Add new fees payment for this client!
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={3}
              sx={{marginTop: {xs: '15px', sm: '0'}}}>
                <input
                  type="date"
                  className="datePicker"
                  onChange={(e) => setPaidDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}
              sx={{marginTop: {xs: '15px', sm: '0'}}}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Amount"
                  color="success"
                  sx={{ width: '94%' }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}
              sx={{marginTop: {xs: '15px', sm: '0'}}}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Paid Amount"
                  color="success"
                  sx={{ width: '94%' }}
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}
              sx={{marginTop: {xs: '15px', sm: '0'}}}>
                <FormControl sx={{ width: '94%' }}>
                  <InputLabel id="demo-simple-select-label" color="success">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    color="success"
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
                  display: 'flex',
                  justifyContent: 'center',
                  height: '100px',
                  alignItems: 'center',
                  marginTop: {xs: '15px', sm: '0'}
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: '330px' }}
                  color="success"
                  disabled=""
                  onClick={handleFeePayment}
                >
                  Add Fee Payment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClientProfile
