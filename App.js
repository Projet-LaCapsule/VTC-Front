import React, {Fragment} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapResult from './Components/MapResult';

import Navigation from './Navigation';
import Travel from './Reducers/travel-reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({Travel}));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
      {/* <MapResult/> */}
    </Provider>
  );
}