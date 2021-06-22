import React, { useState, useEffect } from "react"
import InputMedReminder from "./Components/InputMedReminder"

const App = () => {
    return (
        <div>
            <h1>Hello!</h1>
            <h2>Input a medicine to get a reminder message!</h2>
            <InputMedReminder/>
        </div>
    );
};

export default App;