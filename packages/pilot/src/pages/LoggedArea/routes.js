import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import Transactions from '../Transactions'
import UserSettings from '../UserSettings'

export default {
  transactions: {
    title: 'transactions.list',
    path: '/transactions',
    component: Transactions,
    icon: Transaction32,
    exact: true,
  },
  transactionsDetails: {
    title: 'transactions.details',
    path: '/transactions/:id',
    exact: true,
  },
  userSettings: {
    title: 'User Settings',
    path: '/user-settings',
    component: UserSettings,
    icon: Transaction32,
  },
}
