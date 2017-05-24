import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class MySurveys extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="u-maxWidth700 u-marginAuto">MySurveys</div>
        );
    }
}
MySurveys.propTypes = propTypes;
MySurveys.defaultProps = defaultProps;
export default MySurveys;
