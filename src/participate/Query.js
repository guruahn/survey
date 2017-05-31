import React, { Component, PropTypes } from 'react';
import { answerTypes } from '../config/constants';

import Answers from './Answers';

class Query extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    const setAnswer = (queryKey) => {
      //console.log('queryKey', queryKey)
      if(this.props.answerData && this.props.answerData.length > 0){
        return this.props.answerData.map((answers, i) => {
          if(answers.queryKey == queryKey) {
            console.log('answers', answers)
            return (
              <Answers
                key={`answer-${queryKey}-${i}`}
                answerData={answers}
                queryKey={queryKey}
                answerIndex={i}
                inputType={answerTypes[this.props.queryData.value.answerType].inputType}
                answerType={this.props.queryData.value.answerType}
                onChangeAnswer={this.props.onChangeAnswer}
                />
            )
          }
        })
      }

    }
    return(
      <div className={"u-padding1Em u-borderBottomNormal"}>
        <div>
          <h3>{this.props.queryData.value.question}</h3>
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
