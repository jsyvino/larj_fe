import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchSentEmails } from '../store/emails'

import './Navbar.css'

export class Navbar extends Component {
  componentDidMount() {
    this.props.getSentEmails()
  }
  render() {
    const emailList = this.props.emails.emailList
    return (
      <nav>
      <div className='nav-bar'>
        <h4>{`${emailList.length} Emails Sent!`}</h4>
        <h3>Email Action Database</h3>
        <Link to="/causes" >
          <button className="navLink" >Cause List</button>
        </Link>
      </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      emails: state.emails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getSentEmails: () => {
      dispatch(fetchSentEmails())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
