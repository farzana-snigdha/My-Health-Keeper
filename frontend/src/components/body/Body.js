import React from 'react'
import {Switch} from 'react-router-dom'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'
import ForgotPassword from './auth/ForgotPassword'
import {useSelector} from 'react-redux'
import ResetPassword from './auth/ResetPassword'
import Profile from './profile/Profile'
import Home from './home/Home'
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
                 <PrivateRoute path="/home" exact component={Home} />
                 <PrivateRoute path= "/display-medicine-reminderList" exact component={DisplayMedicineReminders} />
                 <PrivateRoute path="/user/activate/:activation_token" exact component={ActivationEmail} />
                 <PrivateRoute path="/profile" exact component={Profile} />
                 <PrivateRoute path= "/display-medicine-reminderList" exact component={DisplayMedicineReminders} />
                 <PrivateRoute path="/menstrual-cycle" exact component={MenstrualCycle} />
                 <PrivateRoute path="/general-health-information" exact component={HealthInfo } />
             </Switch>
         </section>
    )
}
