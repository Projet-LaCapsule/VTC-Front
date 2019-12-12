 import React, {useState} from 'react';
 import { View, TextInput, StyleSheet, Text, Button} from 'react-native';
 import ToggleHeader from "./ToggleHeader";
 import { Tile } from 'react-native-elements';
 import imagetile from '../assets/taxi.jpg';
 import DatePicker from 'react-native-datepicker';
 import AntIcon from "react-native-vector-icons/AntDesign";


var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();

 
const HomePage = props => {   

   var [departure, setDeparture] = useState('');
   var [arrival, setArrival] = useState('');  
   var [date, setDate] = useState(datedujour);
   var [time, setTime] = useState(timeDay);

      // console.log(date)  ;
      //console.log('console log de time',time) ;
      //console.log(timeDay);

      return (
           
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
              onPress={()=>props.navigation.navigate('MapResult')}
          />              
             {/* form HomePage */}

             {/* footer */}
            <View style={{ flex: 1, backgroundColor: '#222831', alignItems: 'center', justifyContent: 'center',width: '100%', maxHeight: 60, marginTop: 10 }}>
            <AntIcon name="car" color="#00adb5" size={35} />
            <Text style = {{color: 'white', fontSize:10}}> Choisissez votre course </Text>
           </View>
      </View>         

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
  

export default HomePage;
 