import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import {
  __,
  always,
  anyPass,
  applySpec,
  assoc,
  complement,
  compose,
  defaultTo,
  either,
  identity,
  isEmpty,
  isNil,
  juxt,
  mergeAll,
  objOf,
  path,
  pipe,
  prop,
  tail,
  uncurryN,
  unless,
  when,
} from 'ramda'
import cockpit from 'cockpit' // eslint-disable-line no-unused-vars
import qs from 'qs'
import {
  requestBalance,
  receiveBalance,
} from './actions'
import { requestLogout } from '../Account/actions'
import BalanceContainer from '../../containers/Balance'

import clientMock from './clientMock'

const mapStateToProps = ({
  account: {
    client,
    sessionId,
  },
  balance: { loading, query },
}) => ({
  client,
  loading,
  query,
  sessionId,
})

const mapDispatchToProps = dispatch => ({
  onRequestBalance: (query) => {
    dispatch(requestBalance(query))
  },
  onReceiveBalance: ({ query }) => {
    dispatch(receiveBalance({ query }))
  },
  onRequestBalanceFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate(['balance', 'transactions']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const momentToString = momentObj => momentObj.toISOString()

const normalizeDateToString = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(momentToString, objOf(property))
  )
)

const normalizeQueryDatesToString = pipe(
  prop('dates'),
  juxt([normalizeDateToString('start'), normalizeDateToString('end')]),
  mergeAll
)

const stringToMoment = str => moment(str)

const normalizeStringToDate = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(stringToMoment, objOf(property))
  )
)

const normalizeQueryStringToDate = pipe(
  prop('dates'),
  juxt([normalizeStringToDate('start'), normalizeStringToDate('end')]),
  mergeAll,
  objOf('dates')
)

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  search: normalizeTo('', ['search']),
  filters: normalizeTo({}, ['filters']),
  offset: pipe(
    normalizeTo(1, ['offset']),
    Number
  ),
  count: pipe(
    normalizeTo(15, ['count']),
    Number
  ),
  sort: {
    order: normalizeTo('descending', ['sort', 'order']),
    field: normalizeTo(['created_at'], ['sort', 'field']),
  },
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStringToDate,
    normalizeQueryStructure,
  ]),
  mergeAll
)

const isNilOrEmpty = anyPass([isNil, isEmpty])

const getValidId = uncurryN(2, defaultId => unless(
  complement(anyPass([isNil, isNaN, isEmpty])), // eslint-disable-line no-restricted-globals
  always(defaultId)
))

class Balance extends Component {
  constructor (props) {
    super(props)
    // const {
    //   client,
    // } = this.props

    this.state = {
      client: clientMock, // cockpit(client),
      query: {
        dates: {
          start: moment().subtract(30, 'days'),
          end: moment(),
        },
      },
      result: {},
    }

    this.handleAnticipation = this.handleAnticipation.bind(this)
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleWithdraw = this.handleWithdraw.bind(this)

    this.updateQuery = this.updateQuery.bind(this)
    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const {
      history: {
        location,
      },
      match: {
        params,
      },
    } = this.props
    const urlBalanceQuery = location.search

    if (isEmpty(urlBalanceQuery)) {
      this.updateQuery(params.id, this.props.query)
    } else {
      this.requestData(params.id, parseQueryUrl(urlBalanceQuery))
    }
  }

  componentWillReceiveProps (nextProps) {
    const {
      location: { search },
      match: { params },
    } = this.props
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(params.id, parseQueryUrl(location.search))
    }
  }

  updateQuery (id, query) {
    const buildBalanceQuery = pipe(
      normalizeQueryDatesToString,
      assoc('dates', __, query),
      qs.stringify
    )
    const queryObject = isNilOrEmpty(query) ? this.state.query : query
    const pathId = getValidId(this.props.sessionId, id)
    this.props.history.replace({
      pathname: `${pathId}`,
      search: buildBalanceQuery(queryObject),
    })
  }

  requestData (id, query) {
    this.props.onRequestBalance({ query })

    return this.state.client
      .balance
      .search(id, query)
      .then((result) => {
        this.setState({ result })
        this.props.onReceiveBalance(result)
      })
      .catch((error) => {
        this.props.onRequestBalanceFail(error)
      })
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleAnticipation (amount) {
    // TODO: add this method when it's available in API
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleCancelRequest (requestId) {
    // TODO: add this method when it's available in API
  }

  handleDateChange (dates) { // eslint-disable-line class-methods-use-this
    const query = {
      ...this.props.query,
      dates,
    }

    this.updateQuery(query)
  }

  handlePageChange (page) {
    const query = {
      ...this.props.query,
      offset: page,
    }

    this.updateQuery(query)
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleWithdraw (amount) {
    // TODO: add this method when it's available in API
  }

  render () {
    const {
      loading,
      t,
    } = this.props
    const {
      result: {
        balance,
        recipient,
        requests,
        search,
      },
      query: {
        dates,
      },
    } = this.state

    return (
      <Fragment>
        {!loading &&
          <BalanceContainer
            balance={balance}
            dates={dates}
            loading={loading}
            // onAnticipationClick={this.handleAnticipation}
            // onCancelRequestClick={this.handleCancelRequest}
            onDateChange={this.handleDateChange}
            onPageChange={this.handlePageChange}
            // onWithdrawClick={this.handleWithdraw}
            recipient={recipient}
            requests={requests}
            search={search}
            t={t}
          />
        }
      </Fragment>
    )
  }
}

Balance.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
  client: PropTypes.object.isRequired,
  sessionId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  onReceiveBalance: PropTypes.func.isRequired,
  onRequestBalance: PropTypes.func.isRequired,
  onRequestBalanceFail: PropTypes.func.isRequired,
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
}

Balance.defaultProps = {
  query: null,
}

export default enhanced(Balance)
