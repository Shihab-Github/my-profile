import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useBasicInfo from "./hooks/useBasicInfo";
import { BasicInfoShape } from "../../../data/Shapes";

interface BasicInfoEditableProps {
  data: BasicInfoShape;
  profilePhoto: string;
  toggleProfileEditMode: () => void;
  reloadData: () => void;
  setToast: (msg: string, severity: string) => void;
}

const BasicInfoEditable = (props: BasicInfoEditableProps) => {
  const { toggleProfileEditMode, data, setToast, reloadData, profilePhoto } =
    props;

  const {
    saveBasicInfo,
    onNameChange,
    nameErrorText,
    fileName,
    handleFileSelect,
  } = useBasicInfo(true, setToast, toggleProfileEditMode, reloadData);

  return (
    <>
      <Box display="flex" gap={2}>
        <form
          id="myForm"
          style={{ display: "contents" }}
          onSubmit={saveBasicInfo}
        >
          <Box>
            <Avatar
              alt={data.name}
              src={profilePhoto}
              sx={{ width: 124, height: 124 }}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
            <Typography variant="h5">Personal Information</Typography>
            <input type="hidden" name="basicInfoDocId" value={data.id} />
            <TextField
              id="name"
              error={nameErrorText ? true : false}
              required
              name="name"
              defaultValue={data.name}
              fullWidth
              label="Name"
              variant="outlined"
              helperText={nameErrorText}
              onChange={onNameChange}
            />
            <TextField
              id="age"
              required
              name="age"
              defaultValue={data.age}
              label="Age"
              variant="outlined"
              inputProps={{ min: 1, max: 100 }}
              type="number"
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<AttachFileIcon />}
            >
              Upload Photo
              <input
                hidden
                accept="image/*"
                onChange={handleFileSelect}
                type="file"
                name="profile-photo"
              />
            </Button>
            <Typography variant="body2">{fileName}</Typography>
            <Box display="flex" alignItems="center" gap={3}>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button onClick={toggleProfileEditMode}>Cancel</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default BasicInfoEditable;
