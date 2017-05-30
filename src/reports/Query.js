import React, { Component, PropTypes } from 'react';
import {PieChart} from 'react-d3-basic';
class Query extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>{this.props.queryData.value.question}</div>
        );
    }
}
export default Query;
