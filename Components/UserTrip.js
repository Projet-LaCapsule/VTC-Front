import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import {IpAdress} from '../config';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';


const UserTrip = props => {
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    fetch(`http://${IpAdress}:3000/userTrip?id=${props.id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      setUserTrip(data.userTrip.trips);
    })
    .catch(err => (
      console.log(err)
    ))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{flex: 1, backgroundColor: '#eeeeee' }} scrollEnabled={true} >
          <View style={styles.header}>
            <Text style={{color: 'white', fontSize: 30, marginTop: 35, marginLeft: 20}}>Vos Courses </Text>  
          </View>
          {
            userTrip.map((element, i) => (
              <ListItem
                containerStyle={{height: 120}}
                key={i}
                title={
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 4}}>
                    <Ionicons style={{marginTop: 3}} name='md-radio-button-on' size={16} color='#32a6ff'/>
                    <Text style={{fontSize: 14.5, paddingLeft: 5}}> {element.departure}</Text>
                  </View>
                }
                subtitle={
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                    <Ionicons name='md-radio-button-on' size={16} color='#ea1919'/>
                    <Text style={{fontSize: 14.5, paddingLeft: 5}}> {element.arrival}</Text>
                  </View>
                }
                //rightTitle={`${element.price} €`}
                rightTitle= {
                  <View style={{flex: 1, flexDirection: 'column', marginTop: 10}}>
                    <Text style={{fontSize: 17, opacity: 0.6}}> {`${element.distance}`} </Text>
                    <View style={styles.separate} /> 
                    <Text style={{fontSize: 17, opacity: 0.6}}> {`${element.price} €`} </Text>
                  </View>
                }
                bottomDivider
                chevron
              /> 
            ))
          }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  header : {
    height: 100,
    backgroundColor: '#222831',
  },
  separate: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginTop: 8,
    marginBottom: 8
  },
})

function mapStateToProps(state) {
  return {
    id: state.User.id
  }
}

export default connect(
  mapStateToProps,
  null
) (UserTrip);


