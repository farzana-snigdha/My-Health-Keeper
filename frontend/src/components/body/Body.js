import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'
import ForgotPassword from './auth/ForgotPassword'
import {useSelector} from 'react-redux'
import ResetPassword from './auth/ResetPassword'
import Profile from './profile/Profile'
import Home from './home/Home'
import MedicineInput from './medicineReminder/InputMedReminder'
import DisplayMedicineReminders from './medicineReminder/DisplayMedReminders'
import MenstrualCycle from './MenstrualCycle/MenstrualCycle'
import HealthInfo from './genHealthInfo/HealthInfo'
import PrivateRoute from '../../PrivateRoute'
export default function Body() {
    const auth = useSelector(state => state.auth)
        const {isLogged} = auth
    return (
        <section>
            <Switch>
                 {/* <Route path="/" component={Login} exact /> */}
                 <PrivateRoute path="/home" component={Home } exact />
                 
                 <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                 <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
                 <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
                 <PrivateRoute path="/profile" component={Profile} exact />
                 <PrivateRoute path="/medicine-reminder" component={ MedicineInput } exact />
                 <PrivateRoute path= "/display-medicine-reminderList" component={DisplayMedicineReminders} exact />
                 <PrivateRoute path="/menstrual-cycle" component={MenstrualCycle} exact />
                 <PrivateRoute path="/general-health-information" component={  HealthInfo } exact />

             </Switch>
         </section>
    )
}
