import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import HomePage from './Components/HomePage';
import TripOverview from './Components/TripOverwiew';
import SignIn from './Components/SignInPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';


/* var StackNavigator = createStackNavigator({
    MapResult: MapResult,
    TripOverview: TripOverview,
}) */
/* var StackNavigator = createStackNavigator({
    SignUp: {
        screen: SignIn,
        navigationOptions: () => ({
            header: null
        })
    } ,
    MapResult: MapResult,
    TripOverview: TripOverview,
    
}) */

const AppNavigator = createDrawerNavigator({
Home: {
  screen : HomePage
},
MapResult: {
  screen: MapResult
},
TripOverview: {
  screen: TripOverview
}
}); 



export default Navigation = createAppContainer(AppNavigator)