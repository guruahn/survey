import React, { Component, PropTypes } from 'react';

import Answers from './Answers';

class Query extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount(){

  }

  render() {

    const printQueryType = (answerTypes) => {
      return answerTypes.map((type, i)=>{
        return (
          <option value={type.value} key={i} >
            {type.label}
          </option>
        )
      })
    }

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
        <div data-name="query">
          <div>
            <lable>질문내용</lable>
            <input
              type="text"
              value={this.props.queryData.value.question}
              onChange={(e) => this.props.onChangeQueryTitle(e, this.props.queryData.key, this.props.index)}
              onBlur={() => this.props.onBlurQueryTitle(this.props.index)}
            />
            </div>
          <div>
            <label>답변형태</label>
            <select
              value={this.props.queryData.value.answerType}
              onChange={this.onChangeQueryAnswerType}
              ></select>

          </div>
          <div>
            <label>선택항목</label>
            {setAnswer(this.props.queryData.key)}
          </div>
        </div>

      </div>
    );
  }
}
export default Query;
