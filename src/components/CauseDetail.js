import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCauseById } from '../store/causes'
import { recordEmail } from '../store/emails'
import { composeEmail } from './utils'

import './CauseDetail.css'

export class CauseDetail extends Component{
    componentDidMount() {
        this.props.getCausebyId(this.props.match.params.id)
    }

    getLocationText = (city, state) => {
      if (!city && !state) return ""
      return [city, state].join(", ")
    }

    handleSubmit = () => {
      const { causes: {currentCause}, user, recordSentEmail } = this.props
      recordSentEmail(user.name, currentCause.id)
  }

    render() {
      const { causes: {currentCause}, user } = this.props
      if (!currentCause || !currentCause.subject) return null
      const {toField, subject, fullBody} = composeEmail(currentCause.recipient, currentCause.subject, currentCause.body_text, user)
      const locationText = this.getLocationText(currentCause.city, currentCause.state)
      return (
        <div className="cause-detail-container">
          <h1>{`${currentCause.subject}`}</h1>
          {
            currentCause.victim_name &&
            <div className="field-item">
              <span className="bold">Victim: </span>
              <span>{currentCause.victim_name}</span>
            </div>
          }
          {
            locationText &&
            <div className="field-item">
              <span className="bold">Location: </span>
              <span>{locationText}</span>
            </div>
          }
          {
            currentCause.description &&
            <div className="field-item">
              <span className="bold">Description of Cause: </span>
              <span>{currentCause.description}</span>
            </div>
          }
          <div title="Send an Email!">
              <a className="button button-primary"
                onClick={this.handleSubmit}
                href={`mailto:${toField}?subject=${subject}&body=${fullBody}`}
              >
                <p className="primary-text">Demand Justice</p>
              </a>
          </div>
          <div className="field-item">
              <span className="bold">PLEASE consider taking action and emailing the relevant decision makers! Click this button to auto-populate your email.  You are encouraged to edit the body of the email to add your specific opinion about the situation, custom emails are always more impactful; however, if time does not allow, sending a templated email is better than nothing at all!  </span>
          </div>
          <div className="field-item">
              <span className="bold">Email Body Template: </span>
              <span>{currentCause.body_text}</span>
          </div>

        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
        user: state.user,
        causes: state.causes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getCausebyId: (id) => {
        dispatch(fetchCauseById(id))
      },
      recordSentEmail: (name, cause) => {
        dispatch(recordEmail(name, cause))
      },
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(CauseDetail)
