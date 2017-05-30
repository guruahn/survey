import React, { Component, PropTypes } from 'react';

class Reports extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>Reports {this.props.match.params.surveyKey}</div>
        );
    }
}
export default Reports;
