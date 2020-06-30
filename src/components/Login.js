import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setName, setLocation } from '../store/user'

import './Login.css'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameField: props.user.name,
            locationField: props.user.location,
        }
    }

    handleChange = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.currentTarget.id]: evt.currentTarget.value
        })
    }

    handleSubmit= (evt) => {
        evt.preventDefault()
        const { nameField, locationField } = this.state
        this.props.updateUser(nameField, locationField)
    }

    render() {
        const { nameField, locationField } = this.state
        return (
            <form className="login-form">
                <label htmlFor="nameField">Name</label>
                <input
                    type="text"
                    placeholder="Name as it will appear in emails"
                    id="nameField"
                    value={nameField}
                    onChange={this.handleChange}
                />
                <label htmlFor="locationField">Location</label>
                <input
                    type="text"
                    placeholder="Your location as it will appear in emails"
                    id="locationField"
                    value={locationField}
                    onChange={this.handleChange}
                />
                <input className="button-primary" type="submit" value="Send" onClick={this.handleSubmit}/>
            </form>
        )
    }
  }


  const mapStateToProps = (state, ownProps) => {
        return {
        user: state.user,
        }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updateUser: (name, location) => {
        dispatch(setName(name))
        dispatch(setLocation(location))
      },
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Login)
