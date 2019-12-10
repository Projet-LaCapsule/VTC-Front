import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverwiew';
import SignIn from './Components/SignInPage';
import SignUn from './Components/SignUpPage';

import SettingPage from './Components/SettingsPage';
import { createStackNavigator } from 'react-navigation-stack';

var StackNavigator = createStackNavigator({
    SignUp: {
        screen: SignIn,
        navigationOptions: () => ({
            header: null
        })
    } ,
    MapResult: MapResult,
    TripOverview: TripOverview,
    SettingPage: SettingPage,
    
})

export default Navigation = createAppContainer(StackNavigator)