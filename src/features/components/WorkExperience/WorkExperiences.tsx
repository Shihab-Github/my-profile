import React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AlertColor } from "@mui/material/Alert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorkExperiencesReadOnly from "./components/WorkExperiencesReadOnly";
import ExperienceForm from "./components/ExperienceForm";
import useExperienceHook from "./hooks/useExperienceHook";
import useToast from "../../../hooks/useToast";
import Snackbars from "../../../components/UI/Snackbar";
import { experience, FromDate, ToDate } from "../../../data/Experiences";

const emptyFromDate: FromDate = {
  month: "",
  year: new Date().getFullYear(),
};

const emptyToDate: ToDate = {
  month: "",
  year: new Date().getFullYear(),
};

const emptyExp: experience = {
  id: "",
  jobTitle: "",
  company: "",
  current: false,
  fromDate: emptyFromDate,
  toDate: emptyToDate,
  jd: "",
};

const WorkExperiences = () => {
  const { experiences, fetchAgain, editMode, toggleEditMode } =
    useExperienceHook(true);

  const {
    setToast,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
  } = useToast();

  return (
    <>
      <Box
        mt={6}
        mb={0.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography>Work Experience</Typography>
        </Box>
        {!editMode && (
          <Box>
            <IconButton aria-label="edit" onClick={toggleEditMode}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Divider />
      <Box mb={3}></Box>
      {editMode && (
        <ExperienceForm
          toggleEditMode={toggleEditMode}
          reload={fetchAgain}
          setToast={setToast}
          data={emptyExp}
        />
      )}

      {!editMode && experiences.length === 0 && (
        <Typography>No Experiences Available</Typography>
      )}

      {experiences.map((item) => (
        <WorkExperiencesReadOnly
          data={item}
          key={item.id}
          reload={fetchAgain}
          setToast={setToast}
        />
      ))}
      <Snackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity as AlertColor}
      />
    </>
  );
};

export default WorkExperiences;
