import BasicInfoReadOnly from "./BasicInfoReadOnly";
import BasicInfoEditable from "./BasicInfoEditable";
import useBasicInfo from "./hooks/useBasicInfo";
import Snackbars from "../../../components/UI/Snackbar";
import useToast from "../../../hooks/useToast";
import { AlertColor } from "@mui/material/Alert";

const BasicInfo = () => {
  const {
    setToast,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
  } = useToast();
  const { editMode, toggleEditMode, basicInfo, fetchAgain, profilePhoto } =
    useBasicInfo(true);

  const snackBar = (
    <Snackbars
      open={snackbarOpen}
      setOpen={setSnackbarOpen}
      message={snackbarMessage}
      severity={snackbarSeverity as AlertColor}
    />
  );

  if (editMode) {
    return (
      <>
        <BasicInfoEditable
          data={basicInfo}
          setToast={setToast}
          toggleProfileEditMode={toggleEditMode}
          reloadData={fetchAgain}
          profilePhoto={profilePhoto}
        />
        {snackBar}
      </>
    );
  }

  return (
    <>
      <BasicInfoReadOnly
        toggleEditMode={toggleEditMode}
        data={basicInfo}
        profilePhoto={profilePhoto}
      />
      {snackBar}
    </>
  );
};

export default BasicInfo;
