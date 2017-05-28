import React, { Component, PropTypes } from 'react';

class Query extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const printAnswers = (answers, queryIndex) => {
      return answers.map((answer, i) => {
        //console.log(answer)
        return (
          <input
            value={answer}
            onChange={this.setAnswer}
            key={i}
            data-query-index={queryIndex}
            data-answer-index={i}/>
        )
      })
    }
    // const printQueryType = (answerTypes) => {
    //   return answerTypes.map((type, i)=>{
    //     return (
    //       <option value={type.value} key={i} >
    //         {type.label}
    //       </option>
    //     )
    //   })
    // }
    //<label>답변형태</label>
    // <select
    //   value={query.answerType}
    //   onChange={this.onChangeQueryAnswerType}
    //   data-index={i}>{printQueryType()}</select>
    // <label>선택항목</label>
    //{printAnswers(query.answers, i)}
    return(
      <div>
        {}
        <div data-name="query">
          <lable>질문내용</lable><input type="text" value={this.props.data.value.question} onChange={this.props.onChangeQueryTitle}
          data-index={this.props.key} />



        </div>

      </div>
    );
  }
}
export default Query;
