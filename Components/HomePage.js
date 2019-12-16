
 import React, {useState, useEffect} from 'react';
 import { View, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage, Button, Text} from 'react-native';
 import ToggleHeader from "./ToggleHeader";
 import { Tile } from 'react-native-elements';
 import imagetile from '../assets/taxi.jpg';
 import DatePicker from 'react-native-datepicker';
 import AntIcon from "react-native-vector-icons/AntDesign";
 import {connect} from 'react-redux';
 


var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();

const HomePage = props => {   
   const [departure, setDeparture] = useState('');
   const [arrival, setArrival] = useState('');
   const [date, setDate] = useState(datedujour);
   const [time, setTime] = useState(timeDay);

  
    //console.log(date)  ;
    //console.log('console log de time',time) ;
   //console.log(timeDay);

 // Similaire à componentDidMount et componentDidUpdate :
   useEffect(() => {
     function checkUser() {
        AsyncStorage.getItem("userVTC",
          function(err, data) { 
            if(data) {
              var userData = JSON.parse(data); 
              console.log('userData --->')
              console.log(userData);

              props.signUp(userData._id, userData.first_name, userData.last_name, userData.email, userData.tel, userData.password); //enregistre les données pour redux
              props.checkStatus(true); 
              
            } else {
              console.log('No user connected'); 
              props.checkStatus(false); 
            }
          } 
        )
     }
     checkUser();
      //AsyncStorage.removeItem('userVTC')

     
   }, [])

      return (

        <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled> 
      <View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  

      {/* Burger menu */}  
       <ToggleHeader  
        style={styles.toggle}     
        navigation={props.navigation} title="HomePage"  /> 
       
       {/* image */}  
        <Tile 
        titleStyle={{ color: 'black', fontSize: 40}}
        imageSrc={imagetile}
        captionStyle={{ opacity: 1 }}
        title="Ou souhaitez-vous aller ?"
        featured          
        />

        {/* form HomePage */}
         <TextInput style = {styles.input}
              style= {{ marginTop: 10 }}
              underlineColorAndroid = "transparent"
              placeholder = "Ma position"
              placeholderTextColor = "#393e46"
              autoCapitalize = "none"
              onChangeText={(e) => setDeparture(e)}
          />
         
          <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "  Ou allez-vous ?  "
              placeholderTextColor = "#393e46"
              autoCapitalize = "none"
              onChangeText={(e) => setArrival(e)}
          />
          
          <DatePicker
            style = {styles.datepicker}
            date={date}  //initial date from state
            mode="datetime" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2019"
            maxDate="01-01-2021"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(dateChange, timeChange) => { 
            [setDate(dateChange),setTime(timeChange) ]
            //console.log(timeChange);
            var timeNewDay = timeChange.getHours()+" h"+" "+timeChange.getMinutes();
            //console.log(timeNewDay);
            timeNewDay.toString();
            setTime(timeNewDay);
            
          }}
        />
         <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              value = {`${time}`} 
              placeholderTextColor = "#393e46" 
              autoCapitalize = "none"
          />
         

          <Button 
              style = {styles.submitButton}
              title = "Valider"
             onPress={()=> {props.searchTravel(departure, arrival, date, time), props.navigation.navigate('MapResult')}} 
             />              
             {/* form HomePage */}

             {/* footer */}
            <View style={{ flex: 1, backgroundColor: '#222831', alignItems: 'center', justifyContent: 'center',width: '100%', maxHeight: 60, marginTop: 10 }}>
            <AntIcon name="car" color="#00adb5" size={35} />
            <Text style = {{color: 'white', fontSize:10}}> Choisissez votre course </Text>
           </View>
      </View>  
        </KeyboardAvoidingView>       
    );
  } 

const styles = StyleSheet.create({
    toggle: {
      flex: 1,
      marginTop: 0,
      
    },
     datepicker: {
      borderColor: '#222831',
      borderWidth: 0.2,
      width: '70%', 
    },

    input: {
      width: '70%', 
      margin: 8,
      height: 40,
      borderWidth: 0,
      backgroundColor: '#BBBBBB',
      fontWeight: '400',
      padding: 10,
      borderRadius: 3,
      textAlign:'center',
   },
   submitButton: {
      width: '70%',
      backgroundColor: '#00adb5',
      padding: 10,
      marginBottom: 15,
      height: 40,
      borderRadius: 3,
      marginTop: 30,
      color: 'white',
      textAlign:'center',
      
   },
   
 });
  

 function mapDispatchToProps(dispatch) {
  return {
    searchTravel: function(departure, arrival, date, time) {
        dispatch(
          {
            type: 'searchTravel',
            departure: departure,
            arrival: arrival,
            date: date,
            time: time
          }
        )
    },
    signUp: function(id, firstName, lastName, email, tel, password) {
      dispatch(
          {
              type: 'sign',
              id: id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              tel: tel,
              password: password
          }
      )
    },
    checkStatus: function(isConnected) {
      dispatch({type: 'checkStatus', isConnected: isConnected})
    }
  }
} 
 function mapStateToProps(state) {
   console.log(state)

   return {
    isConnected: state.UserStatus
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

 