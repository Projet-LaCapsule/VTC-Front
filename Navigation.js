import { createAppContainer } from 'react-navigation';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverwiew';
import { createStackNavigator } from 'react-navigation-stack';

var StackNavigator = createStackNavigator({
    MapResult: MapResult,
    TripOverview: TripOverview,
})

export default Navigation = createAppContainer(StackNavigator)