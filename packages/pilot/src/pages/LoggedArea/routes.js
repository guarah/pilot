import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'
import Configuration32 from 'emblematic-icons/svg/Configuration32.svg'

import Transactions from '../Transactions'
import UserSettings from '../UserSettings'
import CompanySettings from '../CompanySettings'

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
  configurations: {
    title: 'Configurations',
    path: '/configurations',
    icon: Configuration32,
    subRoute: [
      {
        title: 'general',
        path: '/general',
        component: CompanySettings,
        icon: Configuration32,
      },
    ],
  },
}
