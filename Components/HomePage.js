 import React, {useState} from 'react';
 import { View, TextInput, StyleSheet, Text} from 'react-native';
 import ToggleHeader from "./ToggleHeader";
 import { Tile } from 'react-native-elements';
 import imagetile from '../assets/taxiMin.jpg';
 import { Button } from '@ant-design/react-native';
 import DatePicker from 'react-native-datepicker';

var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();


 
const HomePage = props => {   
   var [departure, setDeparture] = useState('');
   var [arrival, setArrival] = useState('');
   var [date, setDate] = useState(datedujour);
   var [time, setTime] = useState(timeDay);

  

   // console.log(date)  ;
    console.log('console log de time',time) ;
   //console.log(timeDay);

      return (
           
      <View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  

      {/* Burger menu */}  
       <ToggleHeader  
        style={styles.toggle}     
        navigation={props.navigation} title="HomePage"  /> 
       
       {/* image */}  
        <Tile
        imageSrc={imagetile}
        captionStyle={{ opacity: 1 }}
        title="Ou souhaitez-vous aller ?"
        featured          
        />

        {/* form HomePage */}
         <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8}}
              underlineColorAndroid = "transparent"
              placeholder = "  ou êtes vous ?  "
              placeholderTextColor = "black"
              autoCapitalize = "none"
              onChangeText={(e) => setDeparture(e)}
          />

          <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8}}
              underlineColorAndroid = "transparent"
              placeholder = "  oo souhaitez-vous aller ?  "
              placeholderTextColor = "black"
              autoCapitalize = "none"
              onChangeText={(e) => setArrival(e)}
          />
          
          <DatePicker
          style={{width: 200}}
          date={date}  //initial date from state
          //time={time}
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
            console.log(timeChange);
            var timeNewDay = timeChange.getHours()+" h"+" "+timeChange.getMinutes();
            console.log(timeNewDay);
            timeNewDay.toString();
            setTime(timeNewDay);
          }}
        />
         <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'40%',backgroundColor:'white',opacity:0.8}}
              underlineColorAndroid = "transparent"
              value = {`${time}`}
              placeholderTextColor = "black"
              autoCapitalize = "none"
          />

          <Button
              type = "primary"
              style = {{height: 40, margin: 10, backgroundColor: 'red', borderColor: 'red'}} 
              onPress={()=>console.log('console log de button',departure,arrival)}> 
              Valider
          </Button>

       </View>   
        
    );
  }

const styles = StyleSheet.create({
    toggle: {
      flex: 1,
      marginTop: 0
    }
 });
  

export default HomePage;
 