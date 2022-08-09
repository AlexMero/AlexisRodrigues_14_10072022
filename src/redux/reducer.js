/**
 * @typedef {(
 * "add_employees"
 * | "end_added_successfuly"
 * )} actionType
 */

const initialState = {
  employees: [],
  addedSuccessfuly: false,
}

/**
 * [user description]
 *
 * @param   {Object}  state         [state description]
 * @param   {Object}  action        [action description]
 * @param   {actionType} action.type
 * @param   {Object}  action.payload
 *
 * @return  {Object}                [return description]
 */
const app = (state = initialState, action) => {
  // console.log('>>>', action)
  switch (action.type) {
    case 'add_employees':
      return {
        ...state,
        employees: [...state.employees, action.payload],
        addedSuccessfuly: true,
      }
    case 'end_added_successfuly':
      return {
        ...state,
        addedSuccessfuly: false,
      }
    default:
      return state
  }
}

export default app
