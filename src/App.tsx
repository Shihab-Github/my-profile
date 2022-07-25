import Grid from "@mui/material/Grid";
import BasicInfo from "./features/components/BasicInfo/BasicInfo";
import WorkExperiences from "./features/components/WorkExperience/WorkExperiences";
import "./App.css";

function App() {
  return (
    <Grid container mt={4}>
      <Grid item xs={3}></Grid>
      <Grid className="profile-container" p={6} item xs={6}>
        <BasicInfo />
        <WorkExperiences />
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}

export default App;
