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
export default function Body() {
    const auth = useSelector(state => state.auth)
        const {isLogged} = auth
    return (
        <section>
            <Switch>
                 <Route path="/" component={Login} exact />
                 <Route path="/home" component={Home} exact />
                   <Route path="/login" component={isLogged ? NotFound : Login} exact /> 
                  <Route path="/signup" component={isLogged ? NotFound : Signup} exact />
                 <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                 <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
                 <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
                 <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                 <Route path="/medicine-reminder" component={isLogged ? MedicineInput : NotFound} exact />
                 <Route path= "/display-medicine-reminderList" component={isLogged? DisplayMedicineReminders:NotFound} exact />
             
             </Switch>
         </section>
    )
}
