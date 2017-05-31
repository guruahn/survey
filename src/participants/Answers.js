import React, { Component, PropTypes } from 'react';
import { answerTypes } from '../config/constants';

class Answers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const printAnswers = (answers) => {
      //console.log(answers)
      if(answers && answers.answer.length > 0){
        return answers.answer.map((answer, i) => {
          //console.log(`input ${answers.answerKey}-${i}-${answer}`)
          let isChecked = false;
          this.props.respondentAnswers.map((ra) => {
            if(ra == answer) isChecked = true;
          })
          return (
            <div key={`${answers.answerKey}-${i}`}>
              <label>{answer}</label>
              <input
                value={answer}
                name={this.props.queryKey}
                type={this.props.inputType}
                data-query-index={this.props.index}
                data-answer-index={i}
                onChange={(e) => this.props.onChangeAnswer(e, this.props.queryKey, this.props.answerType)}
                disabled={"disabled"}
                checked={isChecked}
                />
            </div>
          )
        })
      }
    }
    return(
      <div>{printAnswers(this.props.answerData)}</div>
    );
  }
}
export default Answers;
