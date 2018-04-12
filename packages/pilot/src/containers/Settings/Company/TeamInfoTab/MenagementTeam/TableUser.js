import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  CardSection,
} from 'former-kit'

const getColumns = () => ([
  { title: 'Nome', accessor: ['name'], orderable: false },
  { title: 'E-mail', accessor: ['email'], orderable: false },
  { title: 'Permissão', accessor: ['role'], orderable: false },
  { title: 'Data de Criação', accessor: ['date_created'], orderable: false },
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
    date_created: PropTypes.string,
  })).isRequired,
}

export default TableUser
