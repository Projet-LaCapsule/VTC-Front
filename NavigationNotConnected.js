import React from "react";
import { createAppContainer } from 'react-navigation';
import HelpPage from './Components/HelpPage';
import SignIn from './Components/SignInPage';
import UserTrip from './Components/UserTrip';
import HomePage from './Components/HomePage';
import ProfilPage from './Components/ProfilPage';
import SignUp from './Components/SignUpPage';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverview';
import SettingPage from './Components/SettingsPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';
import {connect} from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';

 
const MainDrawer = createDrawerNavigator(
  {
  HomePage: {
  screen: HomePage,
  navigationOptions: () => ({
          header: null,
          title:'Accueil'
      })
  }, 

  SignIn: {
      screen: SignIn,
      navigationOptions: () => ({
          header: null,
          title:'Se connecter'
      })
    },

    SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
        header: null,
        title:'Créer un compte'
    })  
    }, 
  
  HelpPage: {
  screen: HelpPage, 
   navigationOptions: () => ({
        header: null,
        title:'Help' 
    })  
  }, 
  
})

const StackConnectedNavigator = createStackNavigator(
  {
      MainDrawer: {
      screen : MainDrawer,
      navigationOptions: () => ({
          header: null
      })
  },  
      MapResult: MapResult,

      TripOverview:TripOverview,
      
      })



export default  Navigation = createAppContainer(StackConnectedNavigator)


