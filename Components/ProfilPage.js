import React from "react";
import {View, Text} from 'react-native';
import { Icon } from 'react-native-elements'
import {connect} from 'react-redux';
import ToggleHeader from "./ToggleHeader";


const ProfilPage = props => {
      let displayHomeAddress;
      let displayOfficeAddress;

      if(props.homeaddress) {
            displayHomeAddress =  <Text onPress={() => props.navigation.navigate('InputPageProfilHome')}> {props.homeaddress}</Text>
      } else {
            displayHomeAddress =  <Text style={{color: '#006eff'}} onPress={() => props.navigation.navigate('InputPageProfilHome')}> Ajouter un domicile </Text>
      }

      if(props.officeaddress) {
            displayOfficeAddress =  <Text onPress={() => props.navigation.navigate('InputPageProfilWork')}> {props.officeaddress}</Text>
      } else {
            displayOfficeAddress =  <Text style={{color: '#006eff'}} onPress={() => props.navigation.navigate('InputPageProfilWork')}> Ajouter un domicile </Text>
      }

      return (
            <View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  
                  <ToggleHeader navigation={props.navigation} title="Votre profil" />    
                  <View style={{flex:1, flexDirection:'column',justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ marginBottom: 20, flexDirection:'row'}}>
                              <Icon name="star"></Icon>{displayHomeAddress}
                        </View>
                        
                        <View style={{ marginBottom: 20, marginTop: 10}}>
                              {displayOfficeAddress}
                        </View>
                        <View style={{ marginTop: 20, flexDirection:'row'}} >
                              <Icon name="settings"></Icon><Text style={{color: '#006eff'}} onPress={() => props.navigation.navigate('SettingPage')}> Modifier vos paramètres </Text>
                        </View>
                  </View> 
            </View> 
      )
    }; 

    function mapStateToProps(state) {
      return {
            homeaddress: state.User.homeaddress,
            officeaddress: state.User.officeaddress
      }
    }
  

  export default connect(
      mapStateToProps,
      null
  ) (ProfilPage)

