
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, AsyncStorage} from 'react-native';
import MapView , {Marker, Polyline} from 'react-native-maps';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import ToggleHeader from "./ToggleHeader";

import { Card, WingBlank, List, Button } from '@ant-design/react-native';

const Item = List.Item

function MapResult(props) {
    const [price, setPrice] = useState(102);
    const [distance, setDistance] = useState(34);

    AsyncStorage.getItem("userVTC",
                function(err, data) { 
                    console.log('MapResult : data not parse ------>' + data)
                  var userData = JSON.parse(data); 
                  console.log('MapResult : data parse ------>' + userData)

                } 
              )
    return (
            <View style={styles.container}>
              <ToggleHeader navigation={props.navigation} title="Votre recherche" />     
                <MapView style={styles.mapStyle} region={{latitude: 45.7615651, longitude: 4.8399114, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                    <Polyline
                        coordinates={[
                            { latitude: 45.7636126, longitude: 4.8495353 },
                            { latitude: 45.7633907, longitude: 4.8344872},
                            { latitude: 45.741537, longitude: 4.819935 },
                        ]}
                        strokeColor="#1587d3" // fallback for when `strokeColors` is not supported by the map-provider

                        strokeWidth={2}
                    />
                    <Marker
                        pinColor="#32a6ff"
                        title="Departure"
                        description="95 Cours Lafayette"
                        coordinate={{latitude: 45.7636126, longitude: 4.8495353}}
                    />
                    <Marker
                        pinColor="#ea1919"
                        title="Arrival"
                        description="97 Cours Charlemagne"
                        coordinate={{latitude: 45.741537, longitude: 4.819935}}
                    />
                </MapView>
                <ScrollView style={{flex: 1}} scrollEnabled={true} >
                    <View style={{marginTop: 1}}>
                        <WingBlank size='sm'>  
                            <Card>
                                <Card.Body>
                                    <List >
                                        <Item extra={ <Ionicons name='md-radio-button-on' size={20} color='#32a6ff'/>}> 95 Cours Lafayette </Item>
                                        <Item extra={ <Ionicons name='md-radio-button-on' size={20} color='#ea1919'/>}> 97 Cours Charlemagne </Item>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
                                            <Text style={styles.textForm}> {price} Km</Text>
                                            <Text style={styles.textFormPrice}> {distance} €</Text>          
                                        </View>
                                        
                                    </List>
                                </Card.Body>
                                <Card.Footer 
                                    content={<Button style={{width: 70, height: 40}}> <Ionicons name='md-arrow-back' size={17} color='black'/> </Button>}
                                    extra={<Button style={{width: 120, height: 40, marginLeft: 40, backgroundColor: '#7d35f2', borderColor: '#7d35f2'}} type='primary' onPress={() => {props.handleClickChoose(price, distance); props.navigation.navigate('TripOverview')} }> Choisir </Button>}
                                />
                            </Card>
                        </WingBlank>     
                    </View>   
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: '60%'
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
      handleClickChoose: function(price, distance) {

          dispatch({type: 'chooseTravel', price: price, distance: distance })
      }
    }
  }
  
  export default connect(
      null,
      mapDispatchToProps
  ) (MapResult);

