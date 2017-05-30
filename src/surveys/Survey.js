import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class Survey extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return(
            <div>
              {this.props.data.title} |
              8개 |
              <Link to={`/mySurveys/${this.props.surveyKey}`} >수정하기</Link> |

              {this.props.data.isDeployed &&
                <span>
                <Link to={`/reports/${this.props.surveyKey}`} >리포트</Link> |
                <Link to={`/participate/${this.props.surveyKey}/${this.props.uid}`}>배포주소</Link>
                </span>
              }
              {!this.props.data.isDeployed &&
                "배포안됨"
              }

            </div>
        );
    }
}
export default Survey;
