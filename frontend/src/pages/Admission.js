import React, { useState, useRef, useEffect, useCallback } from "react";

// Datejs Import
import "datejs";

// Redux Toolkit Import
import { useDispatch } from "react-redux";

// Redux Actions Import
import { createClient } from "../redux/actions/clientActions";

// Import React To Print
import { useReactToPrint } from "react-to-print";

// Import Webcam
import Webcam from "react-webcam";

// Asset Import
import logo from "../assets/BEING.png";

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
  Modal,
} from "@mui/material";

// Material Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Asset import
import profile from "../assets/profile.webp";

const Admission = () => {
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(profile);
  const [admission, setAdmission] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [marital, setMarital] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [lifeStatus, setLifeStatus] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [trainer, setTrainer] = useState("");
  const [gymBefore, setGymBefore] = useState("");
  const [problem, setProblem] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [isAdmissionFeePaidAmount, setIsAdmissionFeePaidAmount] = useState(0);
  const [isAdmissionFeeAmount, setIsAdmissionFeeAmount] = useState(0);
  const [isAdmissionFeePaidStatus, setIsAdmissionFeePaidStatus] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);
  const [feePaidAmount, setFeePaidAmount] = useState(0);
  const [feePaidStatus, setFeePaidStatus] = useState("");
  const [feePaidDate, setFeePaidDate] = useState("");
  const [gymPackage, setGymPackage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Image Uploader
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Webcam Setup
  const videoConstraints = {
    width: 450,
    height: 480,
    facingMode: "environment",
  };
  const webcamRef = useRef(null);
  const capturePhoto = useCallback(async () => {
    const image = webcamRef.current.getScreenshot();
    setProfileImage(image);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  // Webcam Modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "540px",
    bgcolor: "white",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  // Create Client & Print Summary

  const print = useRef();
  const receiptPrint = useRef();

  const generatePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: "Admission Form",
    onAfterPrint: () => alert("Admission Form Printed Successfully!"),
  });

  const generateReceiptPrint = useReactToPrint({
    content: () => receiptPrint.current,
    documentTitle: `${name} Fee receipt`,
    onAfterPrint: () => alert("Receipt Printed Successfully!"),
  });

  const handleCreateClient = () => {
    const feeReminder = Date.parse(admission)
      ?.addMonths(1)
      ?.addDays(-3)
      ?.toString("yyyy-MM-dd");
    const data = {
      profile: profileImage,
      client: {
        date: admission,
        package: gymPackage,
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
        fees: {
          status: feePaidStatus,
          feeDate: admission,
          paidDate: feePaidDate,
          amount: feeAmount,
          paidAmount: feePaidAmount,
          balanceAmount: feeAmount - feePaidAmount,
          method: paymentMethod,
        },
        isAdmissionFeePaid: {
          status: isAdmissionFeePaidStatus,
          amount: isAdmissionFeeAmount,
          amountBalance: isAdmissionFeeAmount - isAdmissionFeePaidAmount,
          amountPaid: isAdmissionFeePaidAmount,
          method: paymentMethod,
        },
        feeReminder,
      },
    };
    dispatch(createClient(data));
    generatePrint();
  };

  return (
    <Box
      sx={{
        padding: "80px 0 80px 65px",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "74px",
          width: "88%",
          display: "flex",
          alignItems: "center",
          paddingLeft: { xs: "10px", sm: "20px", md: "30px" },
          paddingTop: { xs: "10px", sm: "20px", md: "30px" },
          borderBottom: `2px solid ${colors.lightGreen[700]}`,
        }}
      >
        <Typography variant="h5">Add New Admission</Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: { xs: "90%", sm: "76%", md: "74%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: "300px",
              border: `2px solid ${colors.lightGreen[700]}`,
              marginTop: "20px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <Grid container sx={{ height: "100%", width: "100%" }}>
              <Grid item sx={{ minHeight: "500px", width: "100%" }} xs={12}>
                <Box sx={{ width: "100%", padding: "20px 0" }}>
                  <Grid
                    container
                    sx={{
                      justifyContent: "center",
                      gap: "15px 0px",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginBottom: "20px" }}
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
                        max={Date.today().toString("yyyy-MM-dd")}
                        onChange={(e) => setAdmission(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Full Name"
                        required
                        sx={{ width: "94%" }}
                        color="success"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          id="demo-simple-select-label"
                          color="success"
                        >
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          color="success"
                          label="Gender"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          id="demo-simple-select-label"
                          color="success"
                        >
                          Marital
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          color="success"
                          id="demo-simple-select"
                          value={marital}
                          label="Gender"
                          required
                          onChange={(e) => setMarital(e.target.value)}
                        >
                          <MenuItem value={"Single"}>Single</MenuItem>
                          <MenuItem value={"Married"}>Married</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Age"
                        required
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Height"
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Weight"
                        color="success"
                        required
                        sx={{ width: "94%" }}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Goal Weight"
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setGoalWeight(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Life Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="success"
                          value={lifeStatus}
                          label="Gender"
                          required
                          onChange={(e) => setLifeStatus(e.target.value)}
                        >
                          <MenuItem value={"Student"}>Student</MenuItem>
                          <MenuItem value={"Employed"}>Employed</MenuItem>
                          <MenuItem value={"Business"}>Business</MenuItem>
                          <MenuItem value={"H.Wife"}>H.Wife</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Residential Address"
                        color="success"
                        sx={{ width: "98%" }}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        color="success"
                        id="outlined-error-helper-text"
                        label="Phone"
                        sx={{ width: "94%" }}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Mobile"
                        required
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Email"
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="CNIC"
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setCnic(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Trainer
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={trainer}
                          label="Trainer"
                          color="success"
                          required
                          onChange={(e) => setTrainer(e.target.value)}
                        >
                          <MenuItem value={"Yes"}>Yes</MenuItem>
                          <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Gym Before?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="success"
                          value={gymBefore}
                          label="Gym Before?"
                          required
                          onChange={(e) => setGymBefore(e.target.value)}
                        >
                          <MenuItem value={"Yes"}>Yes</MenuItem>
                          <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Physical Problem"
                        required
                        color="success"
                        onChange={(e) => setProblem(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginBottom: "20px" }}
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
                        sx={{ width: "94%" }}
                        color="success"
                        onChange={(e) => setGuardianName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Guardian Phone"
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Relation"
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setRelation(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginBottom: "20px" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          borderBottom: `2px solid ${colors.lightGreen[700]}`,
                        }}
                      >
                        Admission & Initial Fees
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: "-15px" }}>
                      <Typography variant="subtitle2">Admission Fee</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Amount"
                        required
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) =>
                          setIsAdmissionFeeAmount(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Paid"
                        color="success"
                        required
                        sx={{ width: "94%" }}
                        onChange={(e) =>
                          setIsAdmissionFeePaidAmount(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Balance"
                        required
                        color="success"
                        sx={{ width: "94%" }}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={isAdmissionFeeAmount - isAdmissionFeePaidAmount}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Payment Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="success"
                          required
                          value={isAdmissionFeePaidStatus}
                          label="Payment Status"
                          onChange={(e) =>
                            setIsAdmissionFeePaidStatus(e.target.value)
                          }
                        >
                          <MenuItem value={"Paid"}>Paid</MenuItem>
                          <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: "-15px" }}>
                      <Typography variant="subtitle2">Initial Fee</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <input
                        type="date"
                        className="datePicker"
                        onChange={(e) => setFeePaidDate(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Amount"
                        required
                        color="success"
                        sx={{ width: "94%" }}
                        onChange={(e) => setFeeAmount(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Paid"
                        color="success"
                        required
                        sx={{ width: "94%" }}
                        onChange={(e) => setFeePaidAmount(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Fee Balance"
                        required
                        color="success"
                        sx={{ width: "94%" }}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={feeAmount - feePaidAmount}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Payment Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="success"
                          required
                          value={feePaidStatus}
                          label="Payment Status"
                          onChange={(e) => setFeePaidStatus(e.target.value)}
                        >
                          <MenuItem value={"Paid"}>Paid</MenuItem>
                          <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ marginTop: "20px" }}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Payment Method
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="success"
                          required
                          value={paymentMethod}
                          label="Payment Method"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <MenuItem value={"Cash"}>Cash</MenuItem>
                          <MenuItem value={"Online"}>Online</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ marginTop: "20px" }}>
                      <FormControl fullWidth sx={{ width: "94%" }}>
                        <InputLabel
                          color="success"
                          id="demo-simple-select-label"
                        >
                          Select Package
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="success"
                          required
                          value={gymPackage}
                          label="Select Package"
                          onChange={(e) => setGymPackage(e.target.value)}
                        >
                          <MenuItem value={"Cardio"}>Cardio</MenuItem>
                          <MenuItem value={"Strength"}>Strength</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={profileImage}
                        style={{ height: "100px" }}
                        alt="profile"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px 0",
                        }}
                      >
                        <Button
                          onClick={handleClick}
                          variant="contained"
                          color="success"
                          sx={{ marginLeft: "30px" }}
                        >
                          Upload a file
                        </Button>
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          accept="image/*"
                          onChange={handleChange}
                          style={{ display: "none" }}
                        />
                        <Button
                          onClick={handleModalOpen}
                          variant="contained"
                          color="success"
                          sx={{ marginLeft: "30px" }}
                        >
                          Use Webcam
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleModalClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Webcam
                              ref={webcamRef}
                              audio={false}
                              screenshotFormat="image/png"
                              videoConstraints={videoConstraints}
                              onUserMedia={onUserMedia}
                              mirrored={true}
                            />
                            <Button
                              onClick={capturePhoto}
                              variant="contained"
                              color="success"
                              sx={{ marginTop: "15px" }}
                            >
                              Take Photo
                            </Button>
                          </Box>
                        </Modal>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Box ref={print}>
            <Grid
              item
              xs={12}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                },
                border: `2px solid ${colors.lightGreen[700]}`,
                marginTop: "40px",
                borderRadius: "20px",
                padding: "14px 30px",
                "& .MuiGrid-item": {
                  padding: 0,
                },
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Grid
                container
                sx={{
                  width: "100%",
                  overflow: {
                    xs: "scroll",
                    md: "hidden",
                  },
                }}
              >
                <Grid item xs={12} sx={{ display: "flex", height: "170px" }}>
                  <Box
                    sx={{
                      height: "170px",
                      width: "20%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={profileImage}
                      style={{ height: "160px" }}
                      alt="profile"
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "170px",
                      width: "45%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "360px", marginBottom: "6px" }}
                    />
                  </Box>
                  <Box sx={{ width: "35%", height: "220px" }}>
                    <List
                      sx={{
                        width: "100%",
                        padding: "0"
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <ListItem>
                        <ListItemIcon>
                          <PhoneIcon sx={{ fontSize: "22px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box>
                              <Typography variant="body2">
                                03123456789
                              </Typography>
                              <Typography variant="body2">
                                03123456789
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem sx={{ marginTop: "-18px" }}>
                        <ListItemIcon>
                          <EmailIcon sx={{ fontSize: "22px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              beingstrong@gmail.com
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem sx={{ marginTop: "-15px" }}>
                        <ListItemIcon>
                          <InstagramIcon sx={{ fontSize: "22px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              beingstrongfc
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem sx={{ marginTop: "-15px" }}>
                        <ListItemIcon>
                          <LocationOnIcon sx={{ fontSize: "22px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              Plot # 76/20 Sec. 5G near Summit Bank, Saeedabad,
                              Baldia Town, Karachi
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
                  sx={{ textAlign: "center", marginBottom: "20px" }}
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
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">Full Name</Typography>
                    <Box
                      sx={{
                        minWidth: "280px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Gender</Typography>
                    <Box
                      sx={{
                        minWidth: "140px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {gender}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Marital : </Typography>
                    <Box
                      sx={{
                        minWidth: "140px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {marital}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">Age</Typography>
                    <Box
                      sx={{
                        minWidth: "80px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {age}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Height : </Typography>
                    <Box
                      sx={{
                        minWidth: "100px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {height}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Weight : </Typography>
                    <Box
                      sx={{
                        minWidth: "80px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {weight}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Goal Weight : </Typography>
                    <Box
                      sx={{
                        minWidth: "80px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {goalWeight}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Status : </Typography>
                    <Box
                      sx={{
                        minWidth: "100px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {lifeStatus}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">
                      Residential Address :
                    </Typography>
                    <Box
                      sx={{
                        width: "800px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {address}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">Phone : </Typography>
                    <Box
                      sx={{
                        minWidth: "200px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {phone}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Mobile : </Typography>
                    <Box
                      sx={{
                        minWidth: "200px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {mobile}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Email : </Typography>
                    <Box
                      sx={{
                        minWidth: "300px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">CNIC : </Typography>
                    <Box
                      sx={{
                        minWidth: "280px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {cnic}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Trainer : </Typography>
                    <Box
                      sx={{
                        minWidth: "120px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {trainer}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">
                      Have you been gym before? :{" "}
                    </Typography>
                    <Box
                      sx={{
                        minWidth: "120px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {gymBefore}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">
                      Physical / Medical Problem :
                    </Typography>
                    <Box
                      sx={{
                        width: "750px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {problem}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">Package :</Typography>
                    <Box
                      sx={{
                        width: "750px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {gymPackage}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "50px",
                    marginTop: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">
                      Note : Gym staff will not be responsible for any health
                      problem arising from training during exercises!
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ textAlign: "center", marginBottom: "20px" }}
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
                    display: "flex",
                    height: "50px",
                    marginTop: "25px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">
                      Guardian Name :{" "}
                    </Typography>
                    <Box
                      sx={{
                        minWidth: "240px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {guardianName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Phone : </Typography>
                    <Box
                      sx={{
                        minWidth: "200px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {guardianPhone}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Relation : </Typography>
                    <Box
                      sx={{
                        minWidth: "180px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {relation}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "80px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ textAlign: "center", padding: "0 15px" }}>
                    <Typography variant="body2">
                      I abide by the rules and regulations of the gym and I
                      agree all the instructions given by the authorities for
                      the discipline of the gym. I understood that all the
                      payments are non-refundable / non-transferable under any
                      circumstances.
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    height: "60px",
                    marginTop: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="subtitle1">Date : </Typography>
                    <Box
                      sx={{
                        minWidth: "300px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {admission}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: "25px" }}>
                    <Typography variant="subtitle1">Signature : </Typography>
                    <Box
                      sx={{
                        minWidth: "300px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: { xs: "15px", sm: "0" },
              }}
            >
              <Box
                sx={{
                  height: "440px",
                  width: "500px",
                  border: `2px solid ${colors.lightGreen[700]}`,
                  borderRadius: "20px",
                  padding: "16px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "200px", marginBottom: "6px" }}
                  />
                  <Box
                    sx={{
                      border: `1.5px solid black`,
                      height: "30px",
                      width: "115px",
                      background: `${colors.lightGreen[700]}`,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1">FEE RECEIPT</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ marginTop: "6px" }}>
                    Plot # 76/20 Sec. 5G near Summit Bank, Saeedabad, Baldia
                    Town, Karachi
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="body2">
                    Fee Date:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {admission}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Package:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {gymPackage}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Typography variant="body2">
                    Client:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                        minWidth: "240px",
                      }}
                    >
                      {name}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Mobile:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {mobile}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Typography variant="body2">
                    Admission:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {isAdmissionFeeAmount}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Paid:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {isAdmissionFeePaidAmount}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Balance:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {isAdmissionFeeAmount - isAdmissionFeePaidAmount}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Typography variant="body2">
                    Monthly Fee:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {feeAmount}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Paid:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {feePaidAmount}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Balance:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {feeAmount - feePaidAmount}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Box sx={{ width: "60%" }}>
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                      variant="body2"
                    >
                      NOTE:
                    </Typography>
                    <ul style={{ fontSize: "10px", paddingLeft: "10px" }}>
                      <li>
                        If you will be absent for long 3 months then your
                        membership will be Cancelled.
                      </li>
                      <li>Gym will be closed on Sunday.</li>
                      <li>Admission / Monthly fee is not refundable.</li>
                    </ul>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: "140px",
                        borderBottom: "1.5px solid black",
                        height: "70px",
                      }}
                    ></Box>
                    <Typography variant="body2">Signature</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: "15px" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "65%" }}
              onClick={handleCreateClient}
              disabled={
                !admission ||
                !name ||
                !gender ||
                !marital ||
                !age ||
                !weight ||
                !lifeStatus ||
                !address ||
                !mobile ||
                !trainer ||
                !gymBefore ||
                !problem ||
                !isAdmissionFeeAmount ||
                !isAdmissionFeePaidAmount ||
                !isAdmissionFeePaidStatus ||
                !feeAmount ||
                !feePaidAmount ||
                !feePaidStatus ||
                !profileImage ||
                !gymPackage
              }
            >
              Submit & Print
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admission;
