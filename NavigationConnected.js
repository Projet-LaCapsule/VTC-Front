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

  MapResult : {
      screen: MapResult,
      navigationOptions: () => ({
          header: null,
          title:'Votre recherche'
      })
      },
 
  TripOverview: {
      screen: TripOverview,
      navigationOptions: () => ({
          header: null,
          title:'Récapitulatif'
      })
      }, 

  SignIn: {
      screen: SignIn,
      navigationOptions: () => ({
          header: null,
          title:'Se connecter'
      })
    },
  
  HelpPage: {
  screen: HelpPage, 
   navigationOptions: () => ({
        header: null,
        title:'Help' 
    })  
  }, 
  ProfilPage: {
  screen: ProfilPage,
  navigationOptions: () => ({
          headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
          title:'Page profil'
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
      UserTrip: {
      screen: UserTrip,
      navigationOptions: () => ({
          header: null,
          title: 'Vos courses'
      })
      },

      ProfilPage: {
      screen: ProfilPage,
      navigationOptions: () => ({
          header: null,
          title: 'Profil'
      })
      },

      

    SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
        header: null,
        title:'Créer un compte'
    })  
    }, 
      SettingPage: {
      screen: SettingPage,
       navigationOptions: () => ({
        header: null,
        title:'Paramètres'
    })  
      }, 

      })



export default Navigation = createAppContainer(StackConnectedNavigator)


