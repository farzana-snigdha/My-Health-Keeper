import React from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";

function inputMedReminder() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Add Medicine</h2>
        </Grid>
        <form>
          <TextField fullWidth label="Medicine name" placeholder="Medicine name" />
          <TextField fullWidth label="Description" placeholder="Description" />
          <TextField
            label="Start date"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Start date"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default inputMedReminder;
