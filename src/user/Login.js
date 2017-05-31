import React, { Component } from 'react'
import { login } from '../helpers/auth'

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
  }
  render () {
    return (
      <div className="u-maxWidth700 u-marginAuto">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit" className="btn btn-primary u-padding1Em">Login</button>
        </form>
      </div>
    )
  }
}
