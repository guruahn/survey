import React, { Component, PropTypes } from 'react';
import { answerTypes } from '../config/constants';

import Answers from './Answers';

class Query extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount(){

  }

  render() {

    const setAnswer = (queryKey) => {
      //console.log('queryKey', queryKey)
      if(this.props.answerData && this.props.answerData.length > 0){
        return this.props.answerData.map((answers, i) => {
          if(answers.queryKey == queryKey) {
            //console.log('answers', answers)
            return (
              <Answers
                key={`answer-${queryKey}-${i}`}
                answerData={answers}
                isDisable={ (this.props.queryData.value.answerType == 'yesOrNo' || this.props.isDeployed)? "disabled" : false}
                queryKey={queryKey}
                answerIndex={i}
                onChangeAnswerTitle={this.props.onChangeAnswerTitle}
                onBlurAnswerTitle={this.props.onBlurAnswerTitle}
                />
            )
          }
        })
      }

    }
    //{printAnswers(query.answers, i)}
    return(
      <div>
        <div className={"u-padding1Em u-borderBottomNormal"} data-name="query">
          <div className={"u-paddingDot7Em"}>
            <lable>질문내용</lable>
            <input
              type="text"
              value={this.props.queryData.value.question}
              onChange={(e) => this.props.onChangeQueryTitle(e, this.props.queryData.key, this.props.index)}
              onBlur={() => this.props.onBlurQueryTitle(this.props.index)}
              disabled={this.props.isDeployed ? "disabled" : false}
            />
            </div>
          <div className={"u-paddingDot7Em"}>
            <label>답변형태</label>
            <select
              className={"u-paddingDot7Em"}
              value={this.props.queryData.value.answerType}
              onChange={(e) => this.props.onChangeQueryAnswerType(e, this.props.queryData.key, this.props.index )}
              disabled={this.props.isDeployed ? "disabled" : false}
              >
              <option value="yesOrNo">yes / no</option>
              <option value="onlyOne">한 개 선택</option>
              <option value="multiple">여러 개 선택</option>
            </select>

          </div>
          <div className={"u-paddingDot7Em"}>
            <label>선택항목</label>
            {setAnswer(this.props.queryData.key)}
            <button
              disabled={ (this.props.queryData.value.answerType == 'yesOrNo' || this.props.isDeployed) ? "disabled" : false }
              onClick={() => this.props.onClickAddAnswer(this.props.queryData.key, this.props.index)}
              className={"u-paddingDot7Em"}>
              선택항목 추가
            </button>
          </div>
        </div>

      </div>
    );
  }
}
export default Query;
