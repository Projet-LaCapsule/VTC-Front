import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import HomePage from './Components/HomePage';
import TripOverview from './Components/TripOverview';
import SignIn from './Components/SignInPage';
import SignUp from './Components/SignUpPage';

import SettingPage from './Components/SettingsPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';

const AppNavigator = createDrawerNavigator({
Home: {
  screen : HomePage
},
MapResult: {
  screen: MapResult
},
TripOverview: {
  screen: TripOverview
},
}); 


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

export default Navigation = createAppContainer(StackNavigator)