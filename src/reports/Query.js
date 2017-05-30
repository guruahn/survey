import React, { Component, PropTypes } from 'react';
import {PieChart} from 'react-d3-basic'
const propTypes = {
};
const defaultProps = {
};
class Query extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>Query</div>
        );
    }
}
Query.propTypes = propTypes;
Query.defaultProps = defaultProps;
export default Query;
