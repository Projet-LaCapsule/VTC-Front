import React from 'react';
 import { View, Text } from 'react-native';
 import ToggleHeader from "./ToggleHeader";
 import { Platform} from 'react-native';
 
 
 const TripOverview = props =>{
  
    return (
      <View >
        <ToggleHeader navigation={props.navigation} title="TripOverview" />   
          <Text>Trip overview</Text>        
      </View>
    );
  }
export default TripOverview;
