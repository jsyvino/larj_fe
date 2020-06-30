import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { throttle } from 'lodash'

import { clearCurrentCause } from '../store/causes'
import { CauseItem } from './'

import './Causes.css'

export class Causes extends Component {

    constructor(props: PropsT) {
        super(props)
        this.state = {
          filterText: '',
          sortCausesBy: { field: 'created', ascending: true },
        }
    }

    componentDidMount() {
      this.props.resetCurrentCause()
    }

    filterCausesBySearch = throttle(() => {
        const { filterText: f } = this.state
        const { causes: {causeList} } = this.props
        if (!f.length) return causeList
        return causeList.filter(c => {
            const causeText = `${c.subject} ${c.body_text} ${c.description || ""}`
            return causeText.toLowerCase().indexOf(f) >= 0
        })
    }, 200)

    sortCauses = causes => {
        const { filterText: f } = this.state
        const { causes: {causeList} } = this.props
        const filteredCauses = f.length ? this.filterCausesBySearch() : causeList
        const sortBy = this.state.sortCausesBy
        if(!sortBy) return
        const sortedCauses = filteredCauses.concat().sort((cause1, cause2) => {
            const sortField = sortBy.field
            return cause1[sortField] < cause2[sortField] ? -1 : 1
        })
        if (sortBy && !sortBy.ascending) sortedCauses.reverse()
        return sortedCauses
    }

    renderSortableColumnName = (
        label: string,
        field: string,
        stateKey: string,
        width: string | number
      ) => {
        const sortBy = this.state[stateKey]
        // True if the user has selected to sort by this column
        const selectedSort = sortBy && sortBy.field === field
        const showUpArrow = !selectedSort || sortBy.ascending
        const showDownArrow = !selectedSort || !sortBy.ascending
        return (
          <span
            className={classnames(
              ['sortable-column-header', 'center', `small-${width}`],
              { 'is-selected-sort': selectedSort }
            )}
            onClick={() =>
              this.setState(prevState => {
                const prevSortBy = this.state[stateKey]
                return {
                  [stateKey]: {
                    field,
                    // Sort ascending if switching to this tab; otherwise toggle previous state.
                    ascending: !prevSortBy || prevSortBy.field !== field || !prevSortBy.ascending,
                  },
                }
              })
            }
          >
            <span className="name">{label}</span>
            <span className="sort-arrows">
              {showUpArrow && <span className="Arrow Arrow--up" />}
              {showDownArrow && <span className="Arrow Arrow--down" />}
            </span>
          </span>
        )
      }

      renderCauses() {
        const { causes: {causeList}} = this.props

        return (
          <section className="all-causes">
            <header className="table-headers">
              <span className="small-1">Email</span>
              <span className="small-2 center">Subject</span>
              {this.renderSortableColumnName('Victim', 'victim_name', 'sortCausesBy', 1)}
              {this.renderSortableColumnName('State', 'state', 'sortCausesBy', 1)}
              <span className="small-4 center">Email Body</span>
              {this.renderSortableColumnName('Added', 'created', 'sortCausesBy', 1)}
              {/* is kind of hacky but gives the correct class to email */}
            </header>
            <ul>
                {
                    this.sortCauses(causeList).map(causeItem =>
                    <li key={`causeItem ${causeItem.id}`}>
                        <CauseItem cause={causeItem} />
                    </li>
                )
                }
            </ul>
          </section>
        )
      }

    render() {
      const { emails: {emailList} } = this.props
      let max = null
      if(emailList && emailList.length) {
        const frequencies = emailList.reduce((resultObj, cause) => {
          const id = cause.id.toString()
          if (id in resultObj) resultObj[id]++;
          else resultObj[id] = 1;
          return resultObj
        }, {})
        for (const causeId in frequencies) {
          if (!max) max = causeId
          else if(frequencies[max] < frequencies[causeId]) {
            max = causeId
          }
        }
      }

      return (
          <div className="casues-page">
            <h2>Take Action and Support These Causes</h2>
            <p className="causes-summary">
                Review the below causes and if any of them resonante with you, TAKE ACTION and send an email demanding justice.  You are encouraged to edit the body of the email to add your specific opinion about the situation, custom emails are always more impactful; however, if time does not allow, sending a templated email is better than nothing at all!
            </p>
            {
              max &&
              <Link to={`/causes/${max}`} className='most-popular'>
                Most Popular Cause
              </Link>
            }
            {this.renderCauses()}
          </div>
      )
    }
  }


const mapStateToProps = (state) => {
    return {
        causes: state.causes,
        emails: state.emails,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      resetCurrentCause: () => {
        dispatch(clearCurrentCause())
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Causes)
