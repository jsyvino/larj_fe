import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCauses } from './store/causes'

import {
  Causes,
  CauseDetail,
  Login
} from './components'


export class Routes extends Component {
    componentDidMount() {
        this.props.getCauseList()
    }

    render() {
        const { user: { name, location} } = this.props
    return (
        <Switch>
            {
                name && location &&
                <Switch>
                    <Route exact path="/causes/" component={Causes} />
                    <Route path="/causes/:id" component={CauseDetail} />
                    <Route exact path="/" component={Causes} />
                </Switch>
            }
            <Route path="/" component={Login} />
        </Switch>
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
      getCauseList: () => {
        dispatch(fetchCauses())
      },
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
