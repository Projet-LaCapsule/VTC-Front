import React, {useState, Fragment} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import Modal from "react-native-modalbox";
 import ToggleHeader from "./ToggleHeader"

import { Card, WingBlank, Button, InputItem } from '@ant-design/react-native';

function MapResult(props) {
    const [isVisible, setIsVisible] = useState(false);

    var handleClickValidation = () => {
        setIsVisible(!isVisible);
    }
    return (
        <Fragment>
            <ToggleHeader navigation={props.navigation} title="TripOverview" />   
            <ScrollView style={{flex: 1}} scrollEnabled={true} >
                <View style={styles.container}>
                    <View style={{marginTop: 1}}>
                        <WingBlank size='sm'>  
                            <Card>
                                <Text style={styles.titleCard}> Récapitulatif de la course</Text>
                                <Card.Body>
                                    <InputItem style={styles.textForm} value={props.departure} editable={false}> Départ : </InputItem>
                                    <InputItem style={styles.textForm} value={props.arrival} editable={false}> Arrivé : </InputItem>
                                    <InputItem style={styles.textForm} value={`${props.prix} €`} editable={false}> Prix : </InputItem>
                                    <InputItem style={styles.textForm} value={`${props.distance} Km`} editable={false}> Km : </InputItem>
                                    <InputItem style={styles.textForm} value={props.date} extra={props.time} editable={false}> Date : </InputItem>
                                </Card.Body>
                                <Card.Footer 
                                    content={<Button style={{width: 70, height: 40}}> <Ionicons name='md-arrow-back' size={17} color='black'/> </Button>}
                                    extra={<Button style={{width: 120, height: 40, marginLeft: 40, backgroundColor: '#7d35f2', borderColor: '#7d35f2'}} type='primary' onPress={() => handleClickValidation()} > Confirmer </Button>}
                                />
                            </Card>
                        </WingBlank>     
                    </View>   
                </View>
            </ScrollView> 
            <Modal isOpen={isVisible} position={"bottom"} style={[styles.modal, styles.modal4]}>
                <Text style={{marginLeft: 20, marginBottom: 25, color: 'green', fontSize: 20}}> Votre course a été validée <Ionicons name='md-checkmark-circle' size={25} color='green'/> </Text>
                <Button style={{width: '70%', height: 40, marginLeft: 20}} type='primary' onPress={() => [handleClickValidation(), props.navigation.navigate('Signup')]} > Ok !</Button>
            </Modal>
        </Fragment>  
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titleCard: {
       padding: 10,
       fontSize: 22,
       marginLeft: 40,
    },
    textForm: {
       padding: 10,
       opacity: 0.5,
       fontSize: 15,
    },
    textFormPrice: {
        padding: 10,
        fontSize: 21,
        marginRight: 5,
     },
     modal: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      modal4: {
        height: 200
      },
  });

  function mapStateToProps(state) {
      console.log('State TripOverview ----->');
      console.log(state);
    return {
        departure: state.Travel.departure,
        arrival: state.Travel.arrival,
        prix: state.Travel.price,
        distance: state.Travel.distance,
        date: state.Travel.date,
        time: state.Travel.time

    }
  }
  
  export default connect(
    mapStateToProps,
    null
  ) (MapResult);