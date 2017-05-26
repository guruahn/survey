//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { expect, assert } from 'chai'
import { shallow, mount } from 'enzyme'


//Components
import user from '../../config/authInfoForTest'
import { MySurveysStore } from './MySurveys.store'
import {PureSurveyDetail} from '../SurveyDetail'
import { dummy } from './MySurveys.dummy';

//redux
import { createStore } from 'redux'
import reducers from '../../app/reducer'
import { Provider } from 'react-redux'

const store = createStore(reducers);

describe('<SurveysDetail />', () => {
  //공통
  const props = {
    "user": user,
    "auth": true,
    "store": MySurveysStore,
    "match":{"params":{"surveyKey":"-Kl-2ap7ZaFtC4i3VdeU"}},
    "surveyDetail":dummy.surveyDetail
  }

  it('[shallow] SurveyDetail 크래시 없이 렌더', () => {
    //given
    //when
    const wrapper = shallow(<PureSurveyDetail {...props} />);
    //console.log(wrapper.debug())
    //then
  });
  it('SurveyDetail 렌더하면 페이지 제목이 "설문지 작성" 여야 한다', () => {
    //given
    //when
    const wrapper = mount(<PureSurveyDetail  {...props} match={{"params":{"surveyKey":"-Kl-2ap7ZaFtC4i3VdeU"}}}/>);
    //console.log(wrapper.debug())
    //then
    const title = wrapper.find('h1').text();
    expect(title).to.equal("설문지 작성");
  });
  it('SurveyDetail 렌더하면 설문지 제목이 "설문제목을 입력하세요." 이어야 한다.', () => {
    //given
    //when
    const wrapper = mount(<PureSurveyDetail {...props} />);
    //console.log(wrapper.debug())
    //then
    const title = wrapper.find('[data-name="title"]').getDOMNode();
    expect(title.value).to.equal("설문제목을 입력하세요.");
  });
  
  it('SurveyDetail 설문지에 질문이 한 개 있다', () => {
    //given
    //when
    const wrapper = mount(<PureSurveyDetail surveyDetail={dummy.surveyDetail} user={user} auth={true} store={MySurveysStore} match={{"params":{"surveyKey":"-Kl-2ap7ZaFtC4i3VdeU"}}} />);
    //console.log(wrapper.debug())
    //then
    const query = wrapper.find('[data-name="query"]');
    expect(query).to.have.length(1);
  });
});
