import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverwiew';
import SignUp from './Components/SignUpPage';
import { createStackNavigator } from 'react-navigation-stack';

var StackNavigator = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: () => ({
            header: null
        })
    } ,
    MapResult: MapResult,
    TripOverview: TripOverview,
    
})

export default Navigation = createAppContainer(StackNavigator)