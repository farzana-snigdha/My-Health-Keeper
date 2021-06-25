import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Container, IconButton } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

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

function InputMedReminder() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  const [inputFields, setInputFields] = useState([
    { time: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values)
    // const newInputFields = inputFields.map(i => {
    //   if(id === i.id) {
    //     i[event.target.name] = event.target.value
    //   }
    //   return i;
    // })
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { time: '' }])
  }

  const handleRemoveFields = (index) => {
    const values  = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }

  
  return (
    <Container>
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Add Medicine</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
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

          { inputFields.map((inputField, index) => (
            <div key={index}>
              <TextField
               name="time"
               label="Time"
               type="time"
               InputLabelProps={{
                shrink: true,
              }}
               //variant="filled"
               value={inputField.time}
               onChange={event => handleChangeInput(index, event)}
              />

            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(index)}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
              </div>
              
          ))}

          <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
            Add
          </Button>
        </form>
      </Paper>
    </Grid>
    </Container>
  );

}

export default InputMedReminder;
