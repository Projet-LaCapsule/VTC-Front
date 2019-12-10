import React, {Fragment} from 'react';
import Navigation from './Navigation';
import Travel from './Reducers/travel-reducer';
import User from './Reducers/user-reducer';
import UserStatus from './Reducers/userStatus-reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({Travel, User, UserStatus}));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
      {/* <MapResult/> */}
    </Provider>
  );
}

