//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { shallow, mount } from 'enzyme'

//Components
import user from '../../config/authInfoForTest'
import { MySurveysStore } from './MySurveys.store'
import MySurveys from '../MySurveys'

import { createStore } from 'redux'
import reducers from '../../app/reducer'

const store = createStore(reducers);

describe('<MySurveys />', () => {
  it('[shallow] renders without crashing', () => {
    //console.log(MyUnderlinesStore)
    const wrapper = shallow(<MySurveys user={user} auth={true} store={MySurveysStore} />);
    console.log(wrapper.debug())

  });
});
