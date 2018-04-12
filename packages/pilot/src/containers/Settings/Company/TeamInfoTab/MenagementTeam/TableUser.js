import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  CardSection,
} from 'former-kit'

const getColumns = () => ([
  { title: 'Nome', accessor: ['name'], orderable: true },
  { title: 'E-mail', accessor: ['email'], orderable: true },
  { title: 'Permissão', accessor: ['role'], orderable: true },
])

class TableUser extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      columns: getColumns(),
      rows: props.team,
    }
  }

  render () {
    const {
      rows,
      columns,
    } = this.state

    return (
      <CardSection>
        <Table
          columns={columns}
          rows={rows}
        />
      </CardSection>
    )
  }
}

TableUser.propTypes = {
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
}

export default TableUser
