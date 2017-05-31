import React, { Component, PropTypes } from 'react';
import { answerTypes } from '../config/constants';

import Answers from './Answers';

class Query extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    const setAnswer = (queryKey) => {
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
                inputType={answerTypes[this.props.queryData.value.answerType].inputType}
                answerType={this.props.queryData.value.answerType}
                onChangeAnswer={this.props.onChangeAnswer}
                respondentAnswers={this.props.respondentAnswers}
                />
            )
          }
        })
      }

    }
    return(
      <div>
        <div>
          <lable>질문내용 : </lable>
          {this.props.queryData.value.question}
        </div>
        <div>
          <label>선택항목</label>
          {setAnswer(this.props.queryData.key)}
        </div>
      </div>
    );
  }
}
export default Query;
