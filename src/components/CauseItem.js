import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import { recordEmail } from '../store/emails'
import { composeEmail } from './utils'

import './Causes.css'

export  class CauseItem extends Component {

    handleClickItem = () => {
        const { cause, history } = this.props
        history.push(`/causes/${cause.id}`)
    }

    handleSubmit = () => {
        const { cause, user, recordSentEmail } = this.props
        recordSentEmail(user.name, cause.id)
    }

    renderBasicCell = (text, width) => {
        return (
            <p className={`small-${width} cause-cell`} title="Click For More Information" onClick={this.handleClickItem}>{text}</p>
        )
    }

    render() {
        const { cause, user } = this.props
        if (!cause) return null
        const {toField, subject, fullBody} = composeEmail(cause.recipient, cause.subject, cause.body_text, user)
      return (
          <div className="casues-page">
            <div className="item-container">
                <a className="button small-1 button-outline cause-cell"
                    title="Take Action!"
                    onClick={this.handleSubmit}
                    href={`mailto:${toField}?subject=${subject}&body=${fullBody}`}
                >
                    <p>Email</p>
                </a>
                {this.renderBasicCell(cause.subject, 2)}
                {this.renderBasicCell(cause.victim_name || "", 1)}
                {this.renderBasicCell(cause.state || "", 1)}
                {this.renderBasicCell(cause.body_text || "", 4)}
                {this.renderBasicCell(moment(cause.created).format('MM/DD/YYYY'), 1)}
            </div>
          </div>
      )
    }
  }

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recordSentEmail: (name, cause) => {
            dispatch(recordEmail(name, cause))
        },
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CauseItem))
