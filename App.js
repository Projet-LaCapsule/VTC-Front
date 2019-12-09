import React from 'react';
import { createDrawerNavigator} from 'react-navigation-drawer';
import HomePage from './Components/HomePage';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverview';
import { createAppContainer } from 'react-navigation';
import { Platform} from 'react-native';



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

export default createAppContainer(AppNavigator);