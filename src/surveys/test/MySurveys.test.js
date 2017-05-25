//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { expect, assert } from 'chai'
import { shallow, mount } from 'enzyme'


//Components
import user from '../../config/authInfoForTest'
import { MySurveysStore } from './MySurveys.store'
import {PureMySurveys} from '../MySurveys'
import { dummy } from './MySurveys.dummy';

//redux
import { createStore } from 'redux'
import reducers from '../../app/reducer'
import { Provider } from 'react-redux'

const store = createStore(reducers);

describe('<MySurveys />', () => {

  //공통
  const props = {
    user: user,
    auth: true,
  }

  it('[shallow] MySurveys 크래시 없이 렌더', () => {
    //given
    //when
    const wrapper = shallow(<PureMySurveys user={user} auth={true} store={MySurveysStore} />);
    //console.log(wrapper.debug())
    //then
  });
  it('[shallow] MySurveys렌더하면 페이지 제목이 "설문지 목록" 여야 한다', () => {
    //given
    //when
    const wrapper = mount(<PureMySurveys user={user} auth={true} store={MySurveysStore} />);
    //console.log(wrapper.debug())
    //then
    const title = wrapper.find('h2').text();
    expect(title).to.equal("설문지 목록");
  });
  it('[shallow] MySurveys렌더하면 설문조사 목록이 3개 있어야 한다.', () => {
    //given
    //when
    const wrapper = mount(
      <Provider store={MySurveysStore}>
        <BrowserRouter>
          <Route
            render={(props) => <PureMySurveys surveys={dummy.surveys} user={user}/>}
          />
        </BrowserRouter>
      </Provider>
    );

    //console.log(wrapper.debug())
    //console.log(wrapper.props().store)
    //then
    expect(wrapper.find('[data-name="item"]')).to.have.length(3);
  });
  it('MySurveys렌더하면 "설문지 추가" 버튼이 있다.', () => {
    //given
    //when
    const wrapper = mount(<PureMySurveys user={user} auth={true} store={MySurveysStore} />);
    console.log(wrapper.debug())
    //then
    const button = wrapper.find('button').text();
    expect(button).to.equal("설문지 추가");
  });
  it('MySurveys렌더하고 설문조사 목록이 4개 있어야 한다.', () => {
    //given
    dummy.surveys.push({
      "key":"-KidQ676jYnfsuhS-5EA",
      "value":{
        "title": "그냥 재미있는 설문2.",
        "query": [
          {
            "questioin": "다음 보기 중 마음에 들지 않는 것 하나만 선택해주세요.",
            "answerType": "onlyOne",
            "example": ["voce","eu","nos","eles"],
            "order": 4
          }
        ]
      }
    })
    //when
    const wrapper = mount(
      <Provider store={MySurveysStore}>
        <BrowserRouter>
          <Route
            render={(props) => <PureMySurveys surveys={dummy.surveys} user={user}/>}
          />
        </BrowserRouter>
      </Provider>
    );

    //console.log(wrapper.debug())
    //console.log(wrapper.props().store)
    //then
    expect(wrapper.find('[data-name="item"]')).to.have.length(4);
  });
});
