import React, { Component, PropTypes } from 'react';
class Query extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>{this.props.data.key}</div>
        );
    }
}
export default Query;
