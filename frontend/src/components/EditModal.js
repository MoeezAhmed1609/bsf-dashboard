import React, { useState } from "react";
import {
  Modal,
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const EditModal = ({ open, setOpen, profile, editClientProfile }) => {
  console.log({ profile });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: "60%",
      md: "80%",
      xs: "85%",
    },
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: {
      sm: "20px 30px",
      xs: "15px",
    },
    overflowY: "scroll",
  };
  // States
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [marital, setMarital] = useState("");
  const [gymPackage, setGymPackage] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [lifeStatus, setLifeStatus] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState();
  const [guardianRelation, setGuardianRelation] = useState("");
  const [trainer, setTrainer] = useState("");
  const [gymBefore, setGymBefore] = useState("");
  const [problem, setProblem] = useState("");

  const data = [
    {
      title: "Admission Date",
      value: date ? date : profile?.date,
      change: (e) => setDate(e.target.value),
    },
    {
      title: "Name",
      value: name ? name : profile?.name,
      change: (e) => setName(e.target.value),
    },
    {
      title: "Gender",
      value: gender ? gender : profile?.gender,
      change: (e) => setGender(e.target.value),
    },
    {
      title: "Age",
      value: age ? age : profile?.age,
      change: (e) => setAge(e.target.value),
    },
    {
      title: "Marital Status",
      value: marital ? marital : profile?.marital,
      change: (e) => setMarital(e.target.value),
    },
    {
      title: "Package",
      value: gymPackage ? gymPackage : profile?.package,
      change: (e) => setGymPackage(e.target.value),
    },
    {
      title: "Height",
      value: height ? height : profile?.height,
      change: (e) => setHeight(e.target.value),
    },
    {
      title: "Weight",
      value: weight ? weight : profile?.weight,
      change: (e) => setWeight(e.target.value),
    },
    {
      title: "Goal Weight",
      value: goalWeight ? goalWeight : profile?.goalWeight,
      change: (e) => setGoalWeight(e.target.value),
    },
    {
      title: "Life Status",
      value: lifeStatus ? lifeStatus : profile?.lifeStatus,
      change: (e) => setLifeStatus(e.target.value),
    },
    {
      title: "Residential Address",
      value: address ? address : profile?.address,
      change: (e) => setAddress(e.target.value),
    },
    {
      title: "Phone",
      value: phone ? phone : profile?.phone,
      change: (e) => setPhone(e.target.value),
    },
    {
      title: "Mobile",
      value: mobile ? mobile : profile?.mobile,
      change: (e) => setMobile(e.target.value),
    },
    {
      title: "Email",
      value: email ? email : profile?.email,
      change: (e) => setEmail(e.target.value),
    },
    {
      title: "CNIC",
      value: cnic ? cnic : profile?.cnic,
      change: (e) => setCnic(e.target.value),
    },
    {
      title: "Guardian Name",
      value: guardianName ? guardianName : profile?.guardian?.name,
      change: (e) => setGuardianName(e.target.value),
    },
    {
      title: "Guardian Phone",
      value: guardianPhone ? guardianPhone : profile?.guardian?.phone,
      change: (e) => setGuardianPhone(e.target.value),
    },
    {
      title: "Guardian Relation",
      value: guardianRelation ? guardianRelation : profile?.guardian?.relation,
      change: (e) => setGuardianRelation(e.target.value),
    },
    {
      title: "Need Trainer?",
      value: trainer ? trainer : profile?.trainer,
      change: (e) => setTrainer(e.target.value),
    },
    {
      title: "Have been gym before?",
      value: gymBefore ? gymBefore : profile?.gymBefore,
      change: (e) => setGymBefore(e.target.value),
    },
    {
      title: "Physical Problem",
      value: problem ? problem : profile?.problem,
      change: (e) => setProblem(e.target.value),
    },
  ];

  const clientData = {
    id: profile?._id,
    date: date ? date : profile?.date,
    package: gymPackage ? gymPackage : profile?.package,
    name: name ? name : profile?.name,
    gender: gender ? gender : profile?.gender,
    marital: marital ? marital : profile?.marital,
    age: age ? age : profile?.age,
    height: height ? height : profile?.height,
    weight: weight ? weight : profile?.weight,
    goalWeight: goalWeight ? goalWeight : profile?.goalWeight,
    lifeStatus: lifeStatus ? lifeStatus : profile?.lifeStatus,
    address: address ? address : profile?.address,
    phone: phone ? phone : profile?.phone,
    mobile: mobile ? mobile : profile?.mobile,
    email: email ? email : profile?.email,
    cnic: cnic ? cnic : profile?.cnic,
    trainer: trainer ? trainer : profile?.trainer,
    gymBefore: gymBefore ? gymBefore : profile?.gymBefore,
    problem: problem ? problem : profile?.problem,
    guardian: {
      name: guardianName ? guardianName : profile?.guardian.name,
      phone: guardianPhone ? guardianPhone : profile?.guardian.phone,
      relation: guardianRelation
        ? guardianRelation
        : profile?.guardian.relation,
    },
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h6" sx={{ textAlign: "center" }}>
          Edit Profile
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "50%" }} align="center">
                  Title
                </TableCell>
                <TableCell sx={{ width: "50%" }} align="center">
                  Information
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((client, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell component="th" scope="row" align="center">
                    {client.title}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-helperText"
                      defaultValue={client.value}
                      variant="standard"
                      onChange={client.change}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ textAlign: "center", margin: "8px 0" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => editClientProfile(clientData)}
            sx={{ width: "40%" }}
          >
            Apply Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
