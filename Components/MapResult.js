
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, AsyncStorage} from 'react-native';
import MapView , {Marker, Polyline} from 'react-native-maps';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import ToggleHeader from "./ToggleHeader";
import { Card, WingBlank, List, Button } from '@ant-design/react-native';
import decodePolyline from 'decode-google-map-polyline'
import {ApiAddressGoogle} from '../config';
import { createIconSetFromFontello } from 'react-native-vector-icons';
const Item = List.Item

function MapResult(props) {
    const [price, setPrice] = useState(102);
    const [distance, setDistance] = useState(null);
    const [timeTravel, setTimeTravel] = useState(null);
    const [polylineCoordinate, setPolylineCoordinate] = useState([]);
    
    var handleClick = () => {
        if(props.userIsConnected) {
            props.navigation.navigate('TripOverview');
        } else {
            props.navigation.navigate('SignUp');
        }
    }

    useEffect(() => {
        function drawItineraire() {
            if(props.err) {
                return null;
            } else {
                fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${props.positionDeparture.lat},${props.positionDeparture.long}&destination=${props.positionArrival.lat},${props.positionArrival.long}&key=${ApiAddressGoogle}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                   // console.log('Data Result --------->',data.routes[0].overview_polyline.points)
    
                    // decode tout les points retourné par l'api
                    var array = decodePolyline(data.routes[0].overview_polyline.points);
                    
                    // Modifie les objets dans le tableau array pour avoir les clefs latitude et longitude au lieu de lat et lng (pour MapView.Polyline)
                    var cpy = array.map(element => {
                        return {latitude: element.lat, longitude: element.lng}
                    })
    
                    var distanceItineraire = data.routes[0].legs[0].distance.text;
    
                    // Recupere le temps pour aller du point A au point B
                    var tempsItineraire = data.routes[0].legs[0].duration.text;
    
                    //Met a jour les states
                    setPolylineCoordinate(cpy);
                    setDistance(distanceItineraire);
                    setTimeTravel(tempsItineraire);

                    
                })
                .catch(err => {
                    console.log(err);
                })
            }
            
        }

        drawItineraire();
    }, [])

    if(!props.departure || !props.arrival) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222831'}}>
                <Text style={{fontSize: 17, marginBottom: 15, color: 'white'}}> Vous n'avez pas choisi d'itinéraire ¯\_( ͠° ͟ʖ °͠ )_/¯ </Text>
                <Button style={{backgroundColor: '#00adb5', borderColor: '#00adb5'}} type='primary' onPress={() => props.navigation.navigate('HomePage')}> Home </Button>
            </View> 
        );
    }else {
        return (
            <View style={styles.container}>

              <ToggleHeader navigation={props.navigation} title="MapResult" />     
                <MapView style={styles.mapStyle} region={{latitude: props.positionDeparture.lat, longitude: props.positionDeparture.long, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>

                    <Polyline
                        coordinates={polylineCoordinate}
                        strokeColor="#1587d3" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={2}
                    />
                    <Marker
                        pinColor="#32a6ff"
                        title="Departure"
                        description={props.departure}
                        coordinate={{latitude: props.positionDeparture.lat, longitude: props.positionDeparture.long}}
                    />
                    <Marker
                        pinColor="#ea1919"
                        title="Arrival"
                        description={props.arrival}
                        coordinate={{latitude: props.positionArrival.lat, longitude: props.positionArrival.long}}
                    />
                </MapView>
                <ScrollView style={{flex: 1}} scrollEnabled={true} >
                    <View style={{marginTop: 1}}>
                        <WingBlank size='sm'>  
                            <Card>
                                <Card.Body>
                                    <List >
                                        <Item extra={ <Ionicons name='md-radio-button-on' size={20} color='#32a6ff'/>}> {props.departure} </Item>
                                        <Item extra={ <Ionicons name='md-radio-button-on' size={20} color='#ea1919'/>}> {props.arrival} </Item>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
                                            <Text style={styles.textForm}> {distance} </Text>
                                            <Text style={styles.textFormPrice}> {price} €</Text>          
                                        </View>
                                        
                                    </List>
                                </Card.Body>
                                <Card.Footer 
                                    content={<Button style={{width: 70, height: 40}}> <Ionicons name='md-arrow-back' size={17} color='black'/> </Button>}
                                    extra={<Button style={{width: 120, height: 40, marginLeft: 40, backgroundColor: '#7d35f2', borderColor: '#7d35f2'}} type='primary' onPress={() => {props.handleClickChoose(price, distance, timeTravel); handleClick()} }> Choisir </Button>}
                                />
                            </Card>
                        </WingBlank>     
                    </View>   
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: '40%'
    },
    textForm: {
       padding: 10,
       fontSize: 18,
       marginLeft: 6,
    },
    textFormPrice: {
        padding: 10,
        fontSize: 21,
        marginRight: 5,
     }
  });

  function mapDispatchToProps(dispatch) {
    return {
      handleClickChoose: function(price, distance, time) {

          dispatch({type: 'chooseTravel', price: price, distance: distance, time: time })
      }
    }
  }

  function mapStateToProps(state) {
      console.log(state)
      if(Object.entries(state.Travel).length === 0) {
          return {
            err: true
          };
      } else {
        return {
            departure: state.Travel.departure,
            arrival: state.Travel.arrival,
            date: state.Travel.data,
            hourDeparture: state.Travel.hourDeparture,
            positionDeparture: {
                lat: state.Travel.positionDeparture.lat,
                long: state.Travel.positionDeparture.long
            },
            positionArrival: {
                lat: state.Travel.positionArrival.lat,
                long: state.Travel.positionArrival.long
            },
            userIsConnected: state.UserStatus,
            err: false
          }
      }
      
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  ) (MapResult);

