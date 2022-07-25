import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { monthsArr } from "../../../../data/Months";
import { getYears } from "../../../../util/functions";
import SelectBox from "../../../../components/UI/SelectBox";
import useExperienceHook from "../hooks/useExperienceHook";
import { experience } from "../../../../data/Experiences";

interface ExperienceFormProps {
  toggleEditMode: () => void;
  data: experience;
  reload: () => void;
  setToast: (msg: string, severity: string) => void;
}

const ExperienceForm = (props: ExperienceFormProps) => {
  const { toggleEditMode, data, reload, setToast } = props;
  const { jobTitle, company, current, fromDate, toDate, jd } = data;

  const {
    saveExperience,
    showEndDates,
    toggleEndDate,
    companyError,
    titleError,
    onTitleChange,
    onCompanyChange,
    loading,
  } = useExperienceHook(false, current, toggleEditMode, reload, setToast);

  const handleCurrentJob = () => {
    toggleEndDate();
  };

  return (
    <form id="expForm" onSubmit={saveExperience}>
      <Stack spacing={2} mb={2}>
        <input type="hidden" value={data.id} name="docId" />
        <TextField
          variant="outlined"
          label="Job Title"
          name="jobTitle"
          defaultValue={jobTitle}
          onChange={onTitleChange}
          error={titleError ? true : false}
          helperText={titleError}
          required
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Company"
          error={companyError ? true : false}
          helperText={companyError}
          onChange={onCompanyChange}
          defaultValue={company}
          required
          name="company"
          fullWidth
        />
        <Box>
          <Typography fontWeight="bold">Time period</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={current ? true : false}
                  onChange={handleCurrentJob}
                  name="isCurrent"
                />
              }
              label="I currently work here"
            />
          </FormGroup>
        </Box>
        <Box>
          <Typography fontWeight="bold">From</Typography>
          <Box mt={1} display="flex" gap={1} alignItems="center">
            <Box flexGrow={0.3}>
              <SelectBox
                label="Month"
                required={true}
                defaultValue={fromDate.month}
                name="fromMonth"
                list={monthsArr}
              />
            </Box>
            <Box flexGrow={0.2}>
              <SelectBox
                required={true}
                defaultValue={fromDate.year}
                label="Year"
                name="fromYear"
                list={getYears()}
              />
            </Box>
          </Box>
        </Box>
        {!showEndDates && (
          <Box>
            <Typography fontWeight="bold">To</Typography>
            <Box mt={1} display="flex" gap={1} alignItems="center">
              <Box flexGrow={0.3}>
                <SelectBox
                  defaultValue={toDate?.month}
                  label="Month"
                  name="toMonth"
                  list={monthsArr}
                />
              </Box>
              <Box flexGrow={0.2}>
                <SelectBox
                  defaultValue={toDate?.year}
                  label="Year"
                  name="toYear"
                  list={getYears()}
                />
              </Box>
            </Box>
          </Box>
        )}
        <TextField
          multiline
          name="jd"
          defaultValue={jd}
          id="jd"
          minRows="4"
          label="Job Description"
        />

        <Box display="flex" alignItems="center" gap={3}>
          <Box>
            <Button variant="contained" disabled={loading} type="submit">
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
          <Box>
            <Button onClick={toggleEditMode}>Cancel</Button>
          </Box>
        </Box>
      </Stack>
    </form>
  );
};

export default ExperienceForm;
