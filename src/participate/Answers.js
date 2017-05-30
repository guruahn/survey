import React, { Component, PropTypes } from 'react';

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
          return (
            <div key={`${answers.answerKey}-${i}`}>
              <label>{answer}</label>
              <input
                value={answer}
                type={this.props.answerType}
                data-query-index={this.props.index}
                data-answer-index={i}
                onChange={(e) => this.props.onChangeAnswerTitle(e, this.props.queryKey, i)}
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
