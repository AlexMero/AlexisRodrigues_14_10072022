const addEmployees = (user) => ({
  type: 'add_employees',
  payload: user,
})

const endAddedSuccessfuly = () => ({
  type: 'end_added_successfuly',
})

export { addEmployees, endAddedSuccessfuly }
