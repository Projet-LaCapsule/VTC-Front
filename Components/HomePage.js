
import React, {useState, useEffect, Component} from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, AsyncStorage, ScrollView, StyleSheet} from 'react-native';
import ToggleHeader from "./ToggleHeader";
import { Tile } from 'react-native-elements';
import imagetile from '../assets/taxiMin.jpg';

import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import _ from 'lodash';
import AntIcon from "react-native-vector-icons/AntDesign";
import {ApiAddressGoogle} from '../config';

var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();





class HomePage extends Component {   

  constructor() {
    super()

    this.state = {
      departure: '',
      arrival: '',
      date: datedujour,
      hourDeparture: timeDay,
      positionDeparture: {lat: null, long: null},
      positionArrival: {lat: null, long: null},
      predictionsDeparture: [],
      predictionsArrival: []
    }
  }

  componentDidMount() {
    var ctx = this;
    AsyncStorage.getItem("userVTC",
      function(err, data) { 
        if(data) {
          var userData = JSON.parse(data); 
          console.log('userData --->')
          console.log(userData);

          ctx.props.signUp(userData._id, userData.first_name, userData.last_name, userData.email, userData.tel, userData.password); //enregistre les données pour redux
          ctx.props.checkStatus(true); 

        } else {
          console.log('No user connected');
          this.props.checkStatus(false); 
        }
      } 
    )
  }


  getGeocoding = async () => {

    // Transformer Valeur input => 21 rue Test => 21+rue+Test
    var transformAddressDeparture = this.state.departure.split(' ').join('+');
    var transformAddressArrival = this.state.arrival.split(' ').join('+');


    console.log('MY ADDRESS DEPARTURE -------------------->', transformAddressDeparture);
    console.log('MY ADDRESS ARRIVAL -------------------->', transformAddressArrival);

    fetchDeparture = async () => {
      await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressDeparture},+FR&key=${ApiAddressGoogle}`)
      .then(resonse => {
        return resonse.json();
      })
      .then(data => {
        console.log('MY GOOGLE API DATAS --------->', data);
  
        console.log('TEST POSITION ---->', data.results[0].geometry.location.lat)
        console.log('TEST POSITION ---->', data.results[0].geometry.location.lng)
        // Crée une copy du state
        var cpyState = {...this.state.positionDeparture};

        console.log('MY CPY STATE ------->', cpyState)
        // Ajoute Latitude et Longitude dans la copy du state
        cpyState.lat = data.results[0].geometry.location.lat,
        cpyState.long = data.results[0].geometry.location.lng,
        console.log('MY CPY STATE V2 ------->', cpyState)

        // modifie le state par la copy
        this.setState({positionDeparture: cpyState});

      
        //setPositionDeparture({...positionDeparture, lat: data.results[0].geometry.location.lat, long: data.results[0].geometry.location.lng })

        // setPositionDeparture(prevState => {
        //   // Object.assign would also work
        //   return {...prevState, ...cpyState};
        // });

        console.log('MY STATE ------->', this.state.positionDeparture)

      })
      .catch(err => {
        console.log(err)
      })
    }

    fetchArrival = async () => {
       await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressArrival},+FR&key=${ApiAddressGoogle}`)
      .then(resonse => {
        return resonse.json();
      })
      .then(data => {
  
        console.log('TEST POSITION ---->', data.results[0].geometry.location.lat)
        console.log('TEST POSITION ---->', data.results[0].geometry.location.lng)
        var cpyState = {...this.state.positionArrival};

        console.log('MY CPY STATE ------->', cpyState)
        cpyState.lat = data.results[0].geometry.location.lat,
        cpyState.long = data.results[0].geometry.location.lng,
        console.log('MY CPY STATE V2 ------->', cpyState)

        this.setState({positionArrival: cpyState});

      })
      .catch(err => {
        console.log(err)
      })
    }
    
    await fetchDeparture()
    await fetchArrival()

    //Envoie dans redux les adresses, positions, date, heure de la course
    await this.props.searchTravel(this.state.departure, this.state.arrival, this.state.date, this.state.hourDeparture, this.state.positionDeparture.lat, this.state.positionDeparture.long, this.state.positionArrival.lat, this.state.positionArrival.long);

    this.props.navigation.navigate('MapResult');
   }

   onChangeDeparture = async (destination) => {
     // Change la valeur de l'input des que l'on ecrit
        this.setState({departure: destination});

        apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
        try {
          const result = await fetch(apiUrl);
          const json = await result.json();
          console.log(json);
          //Stocke dans un tableau toutes les predictions de l'autocomplete
          this.setState({predictionsDeparture: json.predictions})
        } catch(err) {
          console.log(err);
        }
   }

   onChangeDestination = async (destination) => {
     // Change la valeur de l'input des que l'on ecrit
      this.setState({arrival: destination});
      apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
      try {
        const result = await fetch(apiUrl);
        const json = await result.json();
        console.log(json);
        //Stocke dans un tableau toutes les predictions de l'autocomplete
        this.setState({predictionsArrival: json.predictions})
      } catch(err) {
        console.log(err);
      }

   }


  render() {
    // Permet de crée un element text pour chaque predictions stocker dans le tableau predictionsDeparture
    const predictionsRenderDeparture = this.state.predictionsDeparture.map(predictions => (
      <Text style={styles.predictionsStyle} onPress={() => this.setState({departure: predictions.description, predictionsDeparture: []})} key={predictions.id}>  {predictions.description} </Text>
    ))

    const predictionsRenderArrival = this.state.predictionsArrival.map(predictions => (
      <Text style={styles.predictionsStyle} onPress={() => this.setState({arrival: predictions.description, predictionsArrival: []})} key={predictions.id}>  {predictions.description} </Text>
    ))

    return (
      // Keyboard params
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled > 
        <ScrollView style={{flex: 1}} scrollEnabled={true} >

        <View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  
          {/* Burger menu */}  
          <ToggleHeader  
            style={styles.toggle}     
            navigation={this.props.navigation} title="HomePage"  /> 
          
          {/* image */}  
            
            <Tile 
              titleStyle={{ color: 'black', fontSize: 40}}
              imageSrc={imagetile}
              captionStyle={{ opacity: 1 }}
              title="Ou souhaitez-vous aller ?"
              featured          
            />

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Ma position"
                placeholderTextColor = "#393e46"
                autoCapitalize = "none"
                value= {this.state.departure}
                onChangeText={(e) => this.onChangeDeparture(e)}
              />
          
                {predictionsRenderDeparture}
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "  Ou allez-vous ?  "
                placeholderTextColor = "#393e46"
                autoCapitalize = "none"
                value= {this.state.arrival}
                onChangeText={(e) => this.onChangeDestination(e)}
              />
              {predictionsRenderArrival}
              <DatePicker
                style = {styles.datepicker}
                date={this.state.date}  //initial date from state
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
                  this.setState({date: dateChange, hourDeparture: timeChange})
                  console.log(timeChange);
                  var timeNewDay = timeChange.getHours()+" h"+" "+timeChange.getMinutes();
                  console.log(timeNewDay);
                  timeNewDay.toString();
                  this.setState({hourDeparture: timeNewDay})
                }}
              />

                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  value = {`${this.state.hourDeparture}`}
                  placeholderTextColor = "#393e46" 
                  autoCapitalize = "none"
                />
          

                <Button 
                  style = {styles.submitButton}
                  title = "Valider"
                  onPress={()=> {this.getGeocoding()}}
                />              
              

              {/* footer */}
              <View style={{ flex: 1, backgroundColor: '#222831', alignItems: 'center', justifyContent: 'center',width: '100%', maxHeight: 60, marginTop: 10 }}>
                <AntIcon name="car" color="#00adb5" size={35} />
                <Text style = {{color: 'white', fontSize:10}}> Choisissez votre course </Text>
            </View>

          </View>   
          </ScrollView>
      </KeyboardAvoidingView>
    );
  } 
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
      marginTop: 10
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
      predictionsStyle: {
      backgroundColor: 'white',
      padding: 8,
      fontSize: 16,
      borderWidth: 0.5,
      width: '70%'
    }
   
 });
  

 function mapDispatchToProps(dispatch) {
  return {
    searchTravel: function(departure, arrival, date, hourDeparture, latDeparture, longDeparture, latArrival, longArrival) {
        dispatch(
          {
            type: 'searchTravel',
            departure: departure,
            arrival: arrival,
            date: date,
            hourDeparture: hourDeparture,
            positionDeparture: {
              lat: latDeparture,
              long: longDeparture
            },
            positionArrival: {
              lat: latArrival,
              long: longArrival
            }
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

 