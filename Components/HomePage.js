 import React, {useState, useEffect} from 'react';
 import { View, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage} from 'react-native';
 import ToggleHeader from "./ToggleHeader";
 import { Tile } from 'react-native-elements';
 import imagetile from '../assets/taxiMin.jpg';
 import { Button } from '@ant-design/react-native';
 import DatePicker from 'react-native-datepicker';
 import {connect} from 'react-redux';

 import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();


const HomePage = props => {   
   const [departure, setDeparture] = useState('');
   const [arrival, setArrival] = useState('');
   const [date, setDate] = useState(datedujour);
   const [time, setTime] = useState(timeDay);

  
   // console.log(date)  ;
    //console.log('console log de time',time) ;
   //console.log(timeDay);

   useEffect(() => {
     function checkUser() {
        AsyncStorage.getItem("userVTC",
          function(err, data) { 
            if(data) {
              var userData = JSON.parse(data); 
              console.log(userData);

              props.signUp(userData._id, userData.first_name, userData.last_name, userData.email, userData.tel, userData.password); //enregistre les données pour redux
              props.checkStatus(true); 

            } else {
              console.log('No user connected');
            }
          } 
        )
     }

     checkUser();
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
            imageSrc={imagetile}
            captionStyle={{ opacity: 1 }}
            title="Ou souhaitez-vous aller ?"
            featured          
            />

            {/* form HomePage */}
            <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8}}
                //  underlineColorAndroid = "transparent"
                  placeholder = "  ou êtes vous ?  "
                  placeholderTextColor = "black"
                  //autoCapitalize = "none"
                  onChangeText={(e) => setDeparture(e)}
              />

              {/* <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}

                getDefaultValue={() => ''}

                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAI7Xmu1aSTDNNhWpGQzMeEYYvXe7NNwFw',
                  language: 'fr', // language of the results
                  types: '(cities)' // default: 'geocode'
                }}

                styles={{
                  textInputContainer: {
                    width: '100%'
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  type: 'cafe'
                }}
                
                GooglePlacesDetailsQuery={{
                  // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                  fields: 'formatted_address',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              />
 */}

              <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8}}
                  //underlineColorAndroid = "transparent"
                  placeholder = "  oo souhaitez-vous aller ?  "
                  placeholderTextColor = "black"
                 // autoCapitalize = "none"
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
                  onPress={()=> {props.searchTravel(departure, arrival, date, time), props.navigation.navigate('MapResult')}}> 
                  Valider
              </Button>
          </View>   
      </KeyboardAvoidingView>
      
        
    );
  }

const styles = StyleSheet.create({
    toggle: {
      flex: 1,
      marginTop: 0
    }
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

  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (HomePage);

 