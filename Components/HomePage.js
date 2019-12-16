import React, {useState, useEffect, Component} from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage, ScrollView} from 'react-native';
import ToggleHeader from "./ToggleHeader";
import { Tile } from 'react-native-elements';
import imagetile from '../assets/taxiMin.jpg';
import { Button } from '@ant-design/react-native';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import _ from 'lodash';

import {ApiAddressGoogle} from '../config';
import { render } from 'react-dom';


var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();

// const HomePage = props => {   
//   const [departure, setDeparture] = useState('');
//   const [arrival, setArrival] = useState('');
//   const [date, setDate] = useState(datedujour);
//   const [time, setTime] = useState(timeDay);
//   const [positionDeparture, setPositionDeparture] = useState({lat: null, long: null})
//   const [positionArrival, setPositionArrival] = useState({lat: '', long: ''})

//   const [predictions, setPredictions] = useState([]);

//    useEffect(() => {
//      function checkUser() {
//         AsyncStorage.getItem("userVTC",
//           function(err, data) { 
//             if(data) {
//               var userData = JSON.parse(data); 
//               console.log('userData --->')
//               console.log(userData);

//               props.signUp(userData._id, userData.first_name, userData.last_name, userData.email, userData.tel, userData.password); //enregistre les données pour redux
//               props.checkStatus(true); 

//             } else {
//               console.log('No user connected');
//               props.checkStatus(false); 
//             }
//           } 
//         )
//      }

//      checkUser();
//      //AsyncStorage.removeItem('userVTC');
//    }, [])   

//    var getGeocoding = async () => {

//     var transformAddressDeparture = departure.split(' ').join('+');
//     var transformAddressArrival = arrival.split(' ').join('+');


//     console.log('MY ADDRESS DEPARTURE -------------------->', transformAddressDeparture);
//     console.log('MY ADDRESS ARRIVAL -------------------->', transformAddressArrival);

//      var fetchDeparture = async () => {
//       await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressDeparture},+Lyon,+FR&key=${ApiAddressGoogle}`)
//       .then(resonse => {
//         return resonse.json();
//       })
//       .then(data => {
//         console.log('MY GOOGLE API DATAS --------->', data);
  
//         console.log('TEST POSITION ---->', data.results[0].geometry.location.lat)
//         console.log('TEST POSITION ---->', data.results[0].geometry.location.lng)
//         var cpyState = {...positionDeparture};

//         console.log('MY CPY STATE ------->', cpyState)
//         cpyState.lat = data.results[0].geometry.location.lat,
//         cpyState.long = data.results[0].geometry.location.lng,
//         console.log('MY CPY STATE V2 ------->', cpyState)

//         setPositionDeparture(cpyState)

      
//         //setPositionDeparture({...positionDeparture, lat: data.results[0].geometry.location.lat, long: data.results[0].geometry.location.lng })

//         // setPositionDeparture(prevState => {
//         //   // Object.assign would also work
//         //   return {...prevState, ...cpyState};
//         // });

//         console.log('MY STATE ------->', positionDeparture)

//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }
    
//     await fetchDeparture()

//   //  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressArrival},+Lyon,+FR&key=${ApiAddressGoogle}`)
//   //   .then(resonse => {
//   //     return resonse.json();
//   //   })
//   //   .then(data => {
//   //     console.log(data);

//   //     setPositionArrival({
//   //       lat: data.results[0].geometry.location.lat,
//   //       long: data.results[0].geometry.location.lng,
//   //     })

//   //   })
//   //   .catch(err => {
//   //     console.log(err)
//   //   })
//     await props.searchTravel(departure, arrival, date, time, positionDeparture.lat, positionDeparture.long, positionArrival.lat, positionArrival.long);
//     //await props.searchTravel(departure, arrival, date, time, '123123', longDeparture, latArrival, longArrival);

//     //props.navigation.navigate('MapResult');
//    }

//    var onChangeDeparture = async (destination) => {
//         setDeparture(destination);
//         apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
//         try {
//           const result = await fetch(apiUrl);
//           const json = await result.json();
//           console.log(json);
//           setPredictions(json.predictions);
//         } catch(err) {
//           console.log(err);
//         }
//    }

//   //  const testes = [
//   //   { id: 'azeazeazeazzeaze',
//   //     description: '12 rue zerzerzer'
//   //   },
//   //   { id: 'azeazeazeazaeaze',
//   //     description: '12 rue zerzerzer'
//   //   },
//   //   { id: 'azeazeazeaezeaze',
//   //     description: '12 rue zerzerzer'
//   //   }
//   //  ]


//    const predictionsRenderDeparture = predictions.map(predictions => (
//         <Text style={styles.predictionsStyle} onPress={() => setDeparture(predictions.description)} key={predictions.id}>  {predictions.description} </Text>
//     ))

//       return (
//       <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled> 
//         <View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  

//           {/* Burger menu */}  
//           <ToggleHeader  
//             style={styles.toggle}     
//             navigation={props.navigation} title="HomePage"  /> 
          
//           {/* image */}  
//             {/* <Tile
//             imageSrc={imagetile}
//             captionStyle={{ opacity: 1 }}
//             title="Ou souhaitez-vous aller ?"
//             featured          
//             /> */}

//             {/* form HomePage */}
//             <TextInput style = {{height: 40, marginTop: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8}}
//                 //  underlineColorAndroid = "transparent"
//                   placeholder = "Ou êtes vous ?  "
//                   placeholderTextColor = "black"
//                   //autoCapitalize = "none"
//                   value= {departure}
//                   onChangeText={(e) => onChangeDeparture(e)}
//               />
//                 {predictionsRenderDeparture}
//               <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8}}
//                   //underlineColorAndroid = "transparent"
//                   placeholder = "  Ou souhaitez-vous aller ?  "
//                   placeholderTextColor = "black"
//                  // autoCapitalize = "none"
//                   onChangeText={(e) => setArrival(e)}
//               />
              
//               <DatePicker
//               style={{width: 200}}
//               date={date}  //initial date from state
//               //time={time}
//               mode="datetime" //The enum of date, datetime and time
//               placeholder="select date"
//               format="DD-MM-YYYY"
//               minDate="01-01-2019"
//               maxDate="01-01-2021"
//               confirmBtnText="Confirm"
//               cancelBtnText="Cancel"
//               customStyles={{
//                 dateIcon: {
//                   position: 'absolute',
//                   left: 0,
//                   top: 4,
//                   marginLeft: 0
//                 },
//                 dateInput: {
//                   marginLeft: 36
//                 }
//               }}
//               onDateChange={(dateChange, timeChange) => { 
//                 [setDate(dateChange),setTime(timeChange) ]
//                 console.log(timeChange);
//                 var timeNewDay = timeChange.getHours()+" h"+" "+timeChange.getMinutes();
//                 console.log(timeNewDay);
//                 timeNewDay.toString();
//                 setTime(timeNewDay);
//               }}
//             />
//             <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'40%',backgroundColor:'white',opacity:0.8}}
//                   underlineColorAndroid = "transparent"
//                   value = {`${time}`}
//                   placeholderTextColor = "black"
//                   autoCapitalize = "none"
//               />

//               <Button
//                   type = "primary"
//                   style = {{height: 40, margin: 10, backgroundColor: 'red', borderColor: 'red'}} 
//                   onPress={()=> {getGeocoding()}}> 
//                   Valider
//               </Button>
//           </View>   
//       </KeyboardAvoidingView>
      
        
//     );
//   }



class HomePage extends Component {   

  constructor() {
    super()

    this.state = {
      departure: '',
      arrival: '',
      date: datedujour,
      time: timeDay,
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

    var transformAddressDeparture = this.state.departure.split(' ').join('+');
    var transformAddressArrival = this.state.arrival.split(' ').join('+');


    console.log('MY ADDRESS DEPARTURE -------------------->', transformAddressDeparture);
    console.log('MY ADDRESS ARRIVAL -------------------->', transformAddressArrival);

    fetchDeparture = async () => {
      await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressDeparture},+Lyon,+FR&key=${ApiAddressGoogle}`)
      .then(resonse => {
        return resonse.json();
      })
      .then(data => {
        console.log('MY GOOGLE API DATAS --------->', data);
  
        console.log('TEST POSITION ---->', data.results[0].geometry.location.lat)
        console.log('TEST POSITION ---->', data.results[0].geometry.location.lng)
        var cpyState = {...this.state.positionDeparture};

        console.log('MY CPY STATE ------->', cpyState)
        cpyState.lat = data.results[0].geometry.location.lat,
        cpyState.long = data.results[0].geometry.location.lng,
        console.log('MY CPY STATE V2 ------->', cpyState)

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

    await this.props.searchTravel(this.state.departure, this.state.arrival, this.state.date, this.state.time, this.state.positionDeparture.lat, this.state.positionDeparture.long, this.state.positionArrival.lat, this.state.positionArrival.long);

    this.props.navigation.navigate('MapResult');
   }

   onChangeDeparture = async (destination) => {
        this.setState({departure: destination});
        apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
        try {
          const result = await fetch(apiUrl);
          const json = await result.json();
          console.log(json);
          this.setState({predictionsDeparture: json.predictions})
        } catch(err) {
          console.log(err);
        }
   }

   onChangeDestination = async (destination) => {
      this.setState({arrival: destination});
      apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
      try {
        const result = await fetch(apiUrl);
        const json = await result.json();
        console.log(json);
        this.setState({predictionsArrival: json.predictions})
      } catch(err) {
        console.log(err);
      }

   }


  render() {
    const predictionsRenderDeparture = this.state.predictionsDeparture.map(predictions => (
      <Text style={styles.predictionsStyle} onPress={() => this.setState({departure: predictions.description, predictionsDeparture: []})} key={predictions.id}>  {predictions.description} </Text>
    ))

    const predictionsRenderArrival = this.state.predictionsArrival.map(predictions => (
      <Text style={styles.predictionsStyle} onPress={() => this.setState({arrival: predictions.description, predictionsArrival: []})} key={predictions.id}>  {predictions.description} </Text>
    ))

    return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled> 
      <ScrollView style={{flex: 1}} scrollEnabled={true} >

      <View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  
        {/* Burger menu */}  
        <ToggleHeader  
          style={styles.toggle}     
          navigation={this.props.navigation} title="HomePage"  /> 
        
        {/* image */}  
          <Tile
          imageSrc={imagetile}
          captionStyle={{ opacity: 1 }}
          title="Ou souhaitez-vous aller ?"
          featured          
          />

          {/* form HomePage */}
          <TextInput style = {{height: 40, marginTop: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8, paddingLeft: 8}}
              //  underlineColorAndroid = "transparent"
                placeholder = "Ou êtes vous ?  "
                placeholderTextColor = "black"
                //autoCapitalize = "none"
                value= {this.state.departure}
                onChangeText={(e) => this.onChangeDeparture(e)}
            />
              {predictionsRenderDeparture}
            <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'70%',backgroundColor:'white',opacity:0.8, paddingLeft: 8}}
                //underlineColorAndroid = "transparent"
                placeholder = "  Ou souhaitez-vous aller ?  "
                placeholderTextColor = "black"
               // autoCapitalize = "none"
               value= {this.state.arrival}
               onChangeText={(e) => this.onChangeDestination(e)}

            />
            {predictionsRenderArrival}
            <DatePicker
            style={{width: 200}}
            date={this.state.date}  //initial date from state
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
              this.setState({date: dateChange, time: timeChange})
              console.log(timeChange);
              var timeNewDay = timeChange.getHours()+" h"+" "+timeChange.getMinutes();
              console.log(timeNewDay);
              timeNewDay.toString();
              this.setState({time: timeNewDay})
            }}
          />
          <TextInput style = {{height: 40, margin: 10, borderColor: 'grey', borderWidth: 0.5,width:'40%',backgroundColor:'white',opacity:0.8}}
                underlineColorAndroid = "transparent"
                value = {`${this.state.time}`}
                placeholderTextColor = "black"
                autoCapitalize = "none"
            />

            <Button
                type = "primary"
                style = {{height: 40, margin: 10, backgroundColor: 'red', borderColor: 'red'}} 
                onPress={()=> {this.getGeocoding()}}> 
                Valider
            </Button>
        </View>   
        </ScrollView>

    </KeyboardAvoidingView>
    
      
  );
} 
}




const styles = StyleSheet.create({
    toggle: {
      flex: 1,
      marginTop: 0
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
    searchTravel: function(departure, arrival, date, time, latDeparture, longDeparture, latArrival, longArrival) {
        dispatch(
          {
            type: 'searchTravel',
            departure: departure,
            arrival: arrival,
            date: date,
            time: time,
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

  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (HomePage);

 