import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import ToggleHeader from "./ToggleHeader";

import { Button } from '@ant-design/react-native';

import {IpAdress} from '../config';

function SignUp(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');

    var handleSubmit = () => {
        //Récupere les infos des inputs
        var signupData = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            tel: tel,
            password: password
          });

        //Requete avec la route Back
        fetch(`http://${IpAdress}:3000/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: signupData,
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            console.log(data)
            AsyncStorage.setItem('userVTC', JSON.stringify(data.user)); //Enregistre user dans local storage

            props.signUp(data.user._id, data.user.first_name, data.user.last_name, data.user.email, data.user.tel, data.user.password); //enregistre les données pour redux
            props.checkStatus(true); // Status Connecter
            props.navigation.navigate('TripOverview'); 
        })
        .catch(err => {
            console.log(err)
        })
    }

    return( 
        <View style={styles.container}>
            {/* Burger menu */}  
            <ToggleHeader  
            style={styles.toggle}     
             navigation={props.navigation}  /> 
            <Text style={{marginBottom: 15}} onPress={() => props.navigation.navigate('SignIn')}> Avez-vous un compte ? </Text>
            <View style={styles.separate} /> 
            
            <Text style={{marginBottom: 15}}> Connectez-vous avec : </Text>

            <SocialIcon
                raised={false}
                type='google'
                button={true}
                style={styles.socialButton}
            />
            <SocialIcon
                raised={false}
                type='facebook'
                button={true}
                style={styles.socialButton}
            />
            <SocialIcon
                raised={false}
                type='linkedin'
                button={true}
                style={[styles.socialButton, {marginBottom: 30}]}
            />

            <View style={styles.separate} /> 
            <Text> ou </Text>
            <Text style={{marginBottom: 10}}> Créez un compte </Text>
            
            <TextInput style={styles.textForm} value={lastName} onChangeText={e => setLastName(e)} placeholder='Nom'/>
            <TextInput style={styles.textForm} value={firstName} onChangeText={e => setFirstName(e)} placeholder='Prenom'/>
            <TextInput style={styles.textForm} value={email} onChangeText={e => setEmail(e)} placeholder='Email'/>
            <TextInput style={styles.textForm} value={tel} onChangeText={e => setTel(e)} placeholder='Telephone'/>
            <TextInput style={styles.textForm} value={password} onChangeText={e => setPassword(e)} placeholder='Password'/>

            <Button style={styles.button} onPress={() => handleSubmit()} > Confirmer </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      //marginTop: 50
    },
    separate: {
        height: 1,
        backgroundColor: '#c6d0d3',
        width: '85%',
        marginBottom: 10
    },
    socialButton: {
        width: '70%',
        height: 30
    },
    button: {
        marginLeft: 200,
        marginTop: 20,
        height: 40
    },
    textForm: {
        width: '70%',
        height: 35,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        paddingLeft: 9
    }
  });


  function mapDispatchToProps(dispatch) {
    return {
      signUp: function(id, firstName, lastName, email, tel, password) {

        dispatch(
            {
                type: 'signUp',
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
  
  export default connect(
      null,
      mapDispatchToProps
  ) (SignUp);