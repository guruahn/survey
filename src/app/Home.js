import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firebaseAuth } from '../config/constants';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.user = firebaseAuth().currentUser;
  }

  render () {

    return (
      <div className="u-maxWidth700 u-marginAuto">
        Home. Not Protected. Anyone can see this.
        Please, <Link to="/login" >Login</Link>
      </div>
    )
  }
}
