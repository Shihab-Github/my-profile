import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { experience } from "../../../../data/Experiences";
import { monthsPair } from "../../../../data/Shapes";
import useExperienceHook from "../hooks/useExperienceHook";
import useAlert from "../../../../hooks/useDialog";
import ExperienceForm from "./ExperienceForm";
import AlertDialog from "../../../../components/UI/ConfirmationDialog";
import "../style.css";

interface WorkExperiencesReadOnlyProps {
  data: experience;
  reload: () => void;
  setToast: (msg: string, severity: string) => void;
}

const WorkExperiencesReadOnly = (props: WorkExperiencesReadOnlyProps) => {
  const { data, reload, setToast } = props;

  const { toggleEditMode, editMode, deleteEntry } = useExperienceHook(
    false,
    false,
    () => {},
    reload,
    setToast
  );
  const { open, handleClickOpen, handleClose } = useAlert();

  const getWorkDuration = () => {
    const { fromDate, toDate, current } = data;
    let text =
      monthsPair[Number(fromDate.month)] + " " + fromDate.year + " to ";
    if (current) {
      text = text + "Present";
      return text;
    }

    text = text + monthsPair[Number(toDate?.month)] + " " + toDate?.year;
    return text;
  };

  const promptDelete = () => {
    handleClickOpen();
  };

  return (
    <>
      {editMode ? (
        <ExperienceForm
          toggleEditMode={toggleEditMode}
          data={data}
          reload={reload}
          setToast={setToast}
        />
      ) : (
        <Box mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box flexGrow={1}>
              <Typography className="job-title">{data.jobTitle}</Typography>
            </Box>
            <Box>
              <IconButton aria-label="edit" onClick={toggleEditMode}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton aria-label="delete" onClick={promptDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography className="company">{data.company}</Typography>
          <Typography mb={2} className="duration">{getWorkDuration()}</Typography>
          <Typography className="responsibilites">{data.jd}</Typography>
        </Box>
      )}

      <AlertDialog
        open={open}
        data={data.id}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        saveChanges={deleteEntry}
      />
    </>
  );
};

export default WorkExperiencesReadOnly;
