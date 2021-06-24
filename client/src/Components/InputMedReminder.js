import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";

function addTimeField() {
  return (
    <TextField
      label="time"
      fullWidth
      type="time"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

function inputMedReminder() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {  lastName: "" }]);
  };

  {inputList.map((x, i) => {
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Add Medicine</h2>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Medicine name"
            placeholder="Medicine name"
          />
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

          <Button onClick={addTimeField} color="primary">
            Add Time
          </Button>

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </Paper>
    </Grid>
  );
  }
}
}

export default inputMedReminder;
