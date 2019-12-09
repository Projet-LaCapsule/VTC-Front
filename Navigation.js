import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverwiew';
import SignIn from './Components/SignInPage';
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
    
})

export default Navigation = createAppContainer(StackNavigator)