import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import { Button, } from '@ant-design/react-native';

import {IpAdress} from '../config';

function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var handleSubmit = () => { 
        //Requete avec la route Back
        fetch(`http://${IpAdress}:3000/users/signin?email=${email}&password=${password}`)
        .then(response => {
            return response.json();
        })
        .then( data => {
            console.log(data)
            if(data.response) {
                console.log(data)
                AsyncStorage.setItem('userVTC', JSON.stringify(data.user)); //Enregistre user dans local storage

                props.signUp(data.user._id, data.user.first_name, data.user.last_name, data.user.email, data.user.tel, data.user.password); //enregistre les données pour redux
                props.checkStatus(true); // Status Connecter
                props.navigation.navigate('SettingPage');
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return( 
        <View style={styles.container}>
            <Text style={{marginBottom: 25, fontSize: 25}}> Connectez Vous </Text>
            
            <TextInput style={styles.textForm} value={email} onChangeText={e => setEmail(e)} placeholder='Email'/>
            <TextInput style={styles.textForm} value={password} onChangeText={e => setPassword(e)} placeholder='Password'/>

            <Button style={styles.button} onPress={() => handleSubmit()} > Se Connecter </Button>

            <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('Signup')}> Pas de compte ? </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 50
    },
    socialButton: {
        width: '70%',
        height: 30
    },
    button: {
        marginTop: 20,
        height: 40,
        marginBottom: 25
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
  
  export default connect(
      null,
      mapDispatchToProps
  ) (SignIn);