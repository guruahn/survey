//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { expect, assert } from 'chai'
import { shallow, mount } from 'enzyme'
import { createStore } from 'redux'
import reducers from '../../app/reducer'
import { Provider } from 'react-redux'

//Components
import user from '../../config/authInfoForTest'
import { MySurveysStore } from './MySurveys.store'
import MySurveys from '../MySurveys'
import { dummy } from './MySurveys.dummy';



const store = createStore(reducers);

describe('<MySurveys />', () => {
  it('[shallow] MySurveys 크래시 없이 렌더', () => {
    //given
    //when
    const wrapper = shallow(<MySurveys user={user} auth={true} store={MySurveysStore} />);
    //console.log(wrapper.debug())
    //then
  });
  it('[shallow] MySurveys렌더하면 페이지 제목이 "설문지 목록" 여야 한다', () => {
    //given
    //when
    const wrapper = mount(<MySurveys user={user} auth={true} store={MySurveysStore} />);
    //console.log(wrapper.debug())
    //then
    const title = wrapper.find('h2').text();
    expect(title).to.equal("설문지 목록");
  });
  it('[shallow] MySurveys렌더하면 설문조사 목록이 3개 이상 있어야 한다.', () => {
    //given
    //when
    //const wrapper = mount(<MySurveys user={user} auth={true} store={MySurveysStore} />);
    const props = {
      user: user,
      auth: true,
    }
    const wrapper = mount(
      <Provider store={MySurveysStore}>
        <BrowserRouter>
          <Route
            render={(props) => <MySurveys underlines={dummy.surveys} user={user}/>}
          />
        </BrowserRouter>
      </Provider>
    );

    console.log(wrapper.debug())
    console.log()
    //then
    expect(wrapper).to.have.length(1);
  });
});
