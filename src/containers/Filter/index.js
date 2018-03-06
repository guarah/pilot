import React, { Component } from 'react'
import moment from 'moment'
import {
  Card,
  CardTitle,
  CardContent,
  CardActions,
  CardSection,
  DateInput,
  Input,
  Button,
  Tag,
  Row,
  Col,
  CheckboxGroup,
} from 'former-kit'

import {
  instanceOf,
  arrayOf,
  func,
  shape,
  string,
} from 'prop-types'

import Filter32 from 'emblematic-icons/svg/Filter32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'

import {
  equals,
  partial,
  pick,
} from 'ramda'

import compileTags from './compileTags'
import style from './style.css'

class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
      search: props.search,
      values: props.values,
      dates: props.dates,
    }

    this.handleVisibility = this.handleVisibility.bind(this)
    this.handleDateInputChange = this.handleDateInputChange.bind(this)
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleCleanFilters = this.handleCleanFilters.bind(this)
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)

    this.cardTitle = this.cardTitle.bind(this)
  }

  componentWillReceiveProps (props) {
    const allowed = ['search', 'values', 'dates']
    const { search, values, dates } = this.state

    const next = pick(allowed, props)
    const current = { search, values, dates }

    if (!equals(next, current)) {
      this.setState(next)
    }
  }

  handleVisibility () {
    this.setState({
      collapsed: !this.state.collapsed,
    })

    console.log(this.state.collapsed)
  }

  handleDateInputChange (selectedDate) {
    this.setState({
      dates: selectedDate,
    })
  }

  handleSearchFieldChange (event) {
    this.setState({
      search: event.target.value,
    })
  }

  handleFilterChange (filter, values) {
    this.setState({
      values: {
        ...this.state.values,
        [filter]: values,
      },
    })
  }

  handleCleanFilters () {
    const filters = {
      values: [],
      search: '',
      dates: this.props.dates,
    }

    this.props.onChange(filters)
  }

  handleFiltersSubmit (event) {
    event.preventDefault()

    const {
      values,
      search,
      dates,
    } = this.state

    const currentFilters = {
      values,
      search,
      dates,
    }

    this.setState({
      collapsed: true,
    })

    this.props.onChange(currentFilters)
  }

  cardTitle () {
    const optionsKeys = Object.keys(this.state.values)

    const { collapsed } = this.state

    if (!collapsed) {
      return 'Menos filtros'
    }

    if (collapsed && optionsKeys.length === 0) {
      return 'Mais filtros'
    }

    return 'Editar filtros'
  }

  renderToolbar () {
    const {
      datePresets,
    } = this.props

    const {
      dates,
    } = this.state

    const isDateActive = dates.start !== null && dates.end !== null

    return (
      <div className={style.inputs}>
        <DateInput
          dates={dates}
          active={isDateActive}
          onChange={this.handleDateInputChange}
          presets={datePresets}
          icon={<Calendar32 width={16} height={16} />}
        />
        <Input
          className={style.searchField}
          icon={<Search32 width={16} height={16} />}
          value={this.state.search}
          placeholder="Filtre por ID, CPF, nome e e-mail."
          onChange={this.handleSearchFieldChange}
          active={!!this.state.search}
        />
      </div>
    )
  }

  renderOptions () {
    const {
      values,
      collapsed,
    } = this.state

    const { options } = this.props

    return (
      <CardSection
        title={this.cardTitle()}
        collapsedTitle={this.cardTitle()}
        collapsed={collapsed}
        onTitleClick={() => this.setState({ collapsed: !collapsed })}
      >
        <CardContent>
          <Row>
            {options.map(({ name, items, key }) => (
              <Col palm={12} tablet={6} desk={4} tv={4} key={name}>
                <h4>{name}</h4>
                <Row>
                  <CheckboxGroup
                    columns={2}
                    className={style.CheckboxGroup}
                    options={items}
                    name={name}
                    onChange={partial(this.handleFilterChange, [key])}
                    values={values[key] || []}
                  />
                </Row>
              </Col>
            ))}
          </Row>
        </CardContent>
      </CardSection>
    )
  }

  renderTags () {
    const {
      collapsed,
      values,
    } = this.state

    const {
      options,
    } = this.props

    if (collapsed && values.length > 0) {
      const tags = compileTags(options, values)

      return (
        <div>
          <div className={style.selectedOptionsTitle}>
            Opções selecionadas
          </div>
          <div className={style.selectedOptionsTag}>
            {tags.map(({ value, label }) => (
              <Tag key={value}>
                {label}
              </Tag>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  renderActions () {
    const originalFilters = {
      search: this.props.search,
      dates: this.props.dates,
      values: this.props.values,
    }

    const currentFilters = {
      search: this.state.search,
      dates: this.state.dates,
      values: this.state.values,
    }

    const filtersChanged = !equals(originalFilters, currentFilters)

    return (
      <CardActions>
        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          onClick={this.handleCleanFilters}
          fill="outline"
        >
          Limpar filtros
        </Button>

        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          disabled={!filtersChanged}
          type="submit"
          fill="gradient"
        >
          Filtrar
        </Button>
      </CardActions>
    )
  }

  render () {
    return (
      <Card className={style.allowContentOverflow}>
        <form action="/" method="post" onSubmit={this.handleFiltersSubmit}>
          <CardTitle
            title="Filtros"
            icon={<Filter32 width={16} height={16} />}
          />

          <CardContent className={style.cardContent}>
            {this.renderToolbar()}
            {this.renderOptions()}
            {this.renderTags()}
          </CardContent>

          {this.renderActions()}
        </form>
      </Card>
    )
  }
}

Filters.propTypes = {
  options: arrayOf(shape({
    key: string,
    name: string,
    items: arrayOf(shape({
      label: string,
      value: string,
    })),
  })),
  values: arrayOf(string),
  search: string,
  dates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
  datePresets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })),
  onChange: func,
}

Filters.defaultProps = {
  options: [],
  values: [],
  search: '',
  dates: {
    start: moment(),
    end: moment(),
  },
  datePresets: [],
  onChange: () => undefined,
}

export default Filters