import React from 'react';
import { View, Text } from 'react-native';
import ToggleHeader from "./ToggleHeader";
import { Platform} from 'react-native';

const MapResult = props => {
  
    return (
      <View >        
        <ToggleHeader navigation={props.navigation} title="MapResult" />     
          <Text>Open Drawer</Text>       
      </View>
    );
  }
export default MapResult;