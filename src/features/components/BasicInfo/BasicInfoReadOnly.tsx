import React from "react";
import Typograpgy from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { BasicInfoShape } from "../../../data/Shapes";

interface BasicInfoReadOnlyProps {
  toggleEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
  data: BasicInfoShape;
  profilePhoto: string;
}

const BasicInfoReadOnly = (props: BasicInfoReadOnlyProps) => {
  const { toggleEditMode, data, profilePhoto } = props;
  return (
    <Box display="flex" gap={2}>
      <Box>
        <Avatar
          alt={data.name}
          src={profilePhoto}
          sx={{ width: 124, height: 124 }}
        />
      </Box>
      <Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typograpgy variant="h5">{data.name}</Typograpgy>
          <IconButton aria-label="edit" onClick={toggleEditMode}>
            <EditIcon />
          </IconButton>
        </Box>

        <Typograpgy variant="body1">Age: {data.age}</Typograpgy>
      </Box>
    </Box>
  );
};

export default BasicInfoReadOnly;
