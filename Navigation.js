import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import HomePage from './Components/HomePage';
import TripOverview from './Components/TripOverview';
import SignIn from './Components/SignInPage';
import SignUp from './Components/SignUpPage';
import SettingPage from './Components/SettingsPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';
import {connect} from 'react-redux';


var AppNavigator ;
var isConnected ;


const userConnected = (props) => {
  isConnected = props.isConnected;
}

 if ( isConnected === false){ 
   
   AppNavigator = createDrawerNavigator({
'Accueil': {
  screen : HomePage
},
MapResult: {
  screen: MapResult
},
'Récapitulatif course': {
  screen: TripOverview


},
'Créer un compte': {
  screen: SignUp
},
'Vous connecter': {
  screen: SignIn
},
}); 
 } else {

   AppNavigator = createDrawerNavigator({
'Accueil': {
  screen : HomePage
},
MapResult: {
  screen: MapResult
},
'Récapitulatif course': {
  screen: TripOverview
},

'Vous connecter': {
  screen: SignIn
},
'Créer un compte': {
  screen: SignUp
},
}); 
 }
var StackNavigator = createStackNavigator({
  DrawerNavigationApp: {
    screen: AppNavigator,
    navigationOptions: () => ({
        header: null
    })
},

  Signup: {
      screen: SignUp,
      navigationOptions: () => ({
          header: null
      })
  },
  Signin: {
    screen: SignIn,
    navigationOptions: () => ({
        header: null
    })
},

  SettingPage: SettingPage,

})

function mapStateToProps(state) {
  return {
    isConnected: state.UserStatus
  }
}
const Navigation = createAppContainer(StackNavigator)
export default connect(mapStateToProps,null)(Navigation)

