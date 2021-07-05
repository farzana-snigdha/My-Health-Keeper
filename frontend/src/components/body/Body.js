import React from "react";
import Login from './auth/Login'
import { Switch, Route } from "react-router-dom";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPassword from "./auth/ForgotPassword";
import { useSelector } from "react-redux";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import Home from "./home/Home";
import DisplayMedicineReminders from "./medicineReminder/DisplayMedReminders";
import MenstrualCycle from "./MenstrualCycle/MenstrualCycle";
import HealthInfo from "./genHealthInfo/HealthInfo";
import MedicineInput from "./medicineReminder/InputMedReminder";
import PrivateRoute from "../../PrivateRoute";
export default function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <section>
      <Switch>
        {/* <Route path="/" component={Login} exact /> */}
        {/* <PrivateRoute path="/home" exact component={Home} />
                 <PrivateRoute path= "/display-medicine-reminderList" exact component={DisplayMedicineReminders} />
                 <PrivateRoute path="/user/activate/:activation_token" exact component={ActivationEmail} />
                 <PrivateRoute path="/profile" exact component={Profile} />
                 <PrivateRoute path= "/display-medicine-reminderList" exact component={DisplayMedicineReminders} />
                 <PrivateRoute path= "/medicine-reminder" exact component={MedicineInput} />
                 <PrivateRoute path="/menstrual-cycle" exact component={MenstrualCycle} />
                 <PrivateRoute path="/general-health-information" exact component={HealthInfo } /> */}

        <Route path="/home" component={isLogged ? Home : Login} exact />

        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
        <Route path="/profile" component={isLogged ? Profile : Login} exact />
        <Route
          path="/medicine-reminder"
          component={isLogged ? MedicineInput : Login}
          exact
        />
        <Route
          path="/display-medicine-reminderList"
          component={isLogged ? DisplayMedicineReminders : Login}
          exact
        />
        <Route
          path="/menstrual-cycle"
          component={isLogged ? MenstrualCycle : Login}
          exact
        />
        <Route
          path="/general-health-information"
          component={isLogged ? HealthInfo : Login}
          exact
        />
      </Switch>
    </section>
  );
}
