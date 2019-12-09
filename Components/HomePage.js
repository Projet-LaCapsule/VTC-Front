 import React from 'react';
 import { View, Text} from 'react-native';
 import ToggleHeader from "./ToggleHeader";
 import { Tile } from 'react-native-elements';

 
 
 const HomePage = props => {
  
    return (
      <View >    
       <ToggleHeader navigation={props.navigation} title="HomePage" />     
       <Text >Home</Text>
      
      </View>
    );
  }
export default HomePage;
 