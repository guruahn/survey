import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
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
                <input
                  value={answer}
                  key={`${answers.answerKey}-${i}`}
                  data-query-index={this.props.index}
                  data-answer-index={i}
                  onChange={(e) => this.props.onChangeAnswerTitle(e, this.props.queryKey, i)}
                  onBlur={(e) => this.props.onBlurAnswerTitle(this.props.queryKey, this.props.answerIndex)}
                  disabled={this.props.isDisable}/>
            )
          })
        }

      }
      //console.log('queryKey', this.props.queryKey)
      return(
          <div>{printAnswers(this.props.answerData)}</div>
      );
    }
}
Answers.propTypes = propTypes;
Answers.defaultProps = defaultProps;
export default Answers;
