const redefinePassword = client => data => client
  .user
  .redefinePassword(data)

export default redefinePassword
