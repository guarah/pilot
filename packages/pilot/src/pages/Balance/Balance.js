import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import {
  __,
  applySpec,
  assoc,
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
  unless,
  when,
} from 'ramda'
import cockpit from 'cockpit'
import qs from 'qs'
import {
  requestBalance,
  receiveBalance,
} from './actions'
import { requestLogout } from '../Account/actions'
import BalanceContainer from '../../containers/Balance'

const mapStateToProps = ({
  account: { client },
  balance: { loading, query },
}) => ({ client, loading, query })

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
  translate('transactions'),
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

class Balance extends Component {
  constructor (props) {
    super(props)
    const {
      client,
    } = this.props

    this.state = {
      client: cockpit(client),
      query: {
        id: '',
        dates: {
          start: moment().subtract(30, 'days'),
          end: moment(),
        },
        offset: 1,
        count: 15,
      },
    }

    this.handleAnticipation = this.handleAnticipation.bind(this)
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
    this.handleChangeRecipient = this.handleChangeRecipient.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleWithdraw = this.handleWithdraw.bind(this)

    this.updateQuery = this.updateQuery.bind(this)
    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const urlBalanceQuery = this.props.history.location.search
    if (isEmpty(urlBalanceQuery)) {
      this.updateQuery(this.props.query)
    } else {
      this.requestData(parseQueryUrl(urlBalanceQuery))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props // eslint-disable-line
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(parseQueryUrl(location.search))
    }
  }

  updateQuery (query) {
    const buildBalanceQuery = pipe(
      normalizeQueryDatesToString,
      assoc('dates', __, query),
      qs.stringify
    )

    this.props.history.push({
      pathname: 'balance',
      search: buildBalanceQuery(query),
    })
  }

  requestData (query) {
    this.props.onRequestBalance({ query })

    return this.state.client
      .balance
      .search(query)
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

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleChangeRecipient (id) {
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
      <BalanceContainer
        balance={balance}
        dates={dates}
        loading={loading}
        // onAnticipationClick={this.handleAnticipation}
        // onCancelRequestClick={this.handleCancelRequest}
        // onChangeRecipientClick={this.handleChangeRecipient}
        onDateChange={this.handleDateChange}
        onPageChange={this.handlePageChange}
        // onWithdrawClick={this.handleWithdraw}
        recipient={recipient}
        requests={requests}
        search={search}
        t={t}
      />
    )
  }
}

Balance.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onReceiveBalance: PropTypes.func.isRequired,
  onRequestBalance: PropTypes.func.isRequired,
  onRequestBalanceFail: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
}

export default enhanced(Balance)
