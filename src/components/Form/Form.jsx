import { states } from '../../services/dataManager'
import { addEmployees, endAddedSuccessfuly } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ModalComponent } from 'alexis-modal-p14-oc'
import 'alexis-modal-p14-oc/dist/index.css'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import Select from 'react-select'

export default function Form() {
  const dispatch = useDispatch()
  //@ts-ignore
  const employees = useSelector((state) => state.employees)
  //@ts-ignore
  const added = useSelector((state) => state.addedSuccessfuly)
  // console.log('employees', employees)
  // console.log('added', added)
  const nextId = employees.length + 1

  const [birthCalendarIsOpen, setBirthCalendarIsOpen] = useState(false)
  const [birthDate, setBirthDate] = useState(new Date())
  const [startCalendarIsOpen, setStartCalendarIsOpen] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [selectedState, setSelectedState] = useState(null)
  const [selectedDepartement, setSelectedDepartement] = useState(null)

  const statesOptions = states.map((state) => {
    return {
      value: state.name,
      label: state.abbreviation + ' - ' + state.name,
    }
  })

  const departementOptions = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Ressources', label: 'Human Ressources' },
    { value: 'Legal', label: 'Legal' },
  ]

  function handleSubmit(evt) {
    evt.preventDefault()
    console.log(evt.target.startDate)
    const user = {
      id: nextId,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      dateOfBirth: evt.target.dateOfBirth.value,
      startDate: evt.target.startDate.value,
      address: {
        street: evt.target.street.value,
        city: evt.target.city.value,
        state: evt.target.state.value,
        zip: evt.target.zip.value,
      },
      department: evt.target.department.value,
    }

    console.log('Form submitted!', user)
    dispatch(addEmployees(user))
  }

  function handleModalClick(evt) {
    evt.preventDefault()
    dispatch(endAddedSuccessfuly())
  }

  function handleCloseBirthCalendar(date) {
    setBirthCalendarIsOpen(false)
    setBirthDate(date)
  }
  function handleCloseStartCalendar(date) {
    setStartCalendarIsOpen(false)
    setStartDate(date)
  }

  return (
    <form onSubmit={(evt) => handleSubmit(evt)}>
      <h2>Create Employee</h2>
      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" />
      <label htmlFor="dateOfBirth">Date of Birth</label>

      {birthCalendarIsOpen ? (
        <DayPicker
          mode="single"
          required
          selected={birthDate}
          defaultMonth={birthDate}
          //@ts-ignore
          onDayClick={(date) => handleCloseBirthCalendar(date)}
          fromYear={1940}
          toYear={2025}
          captionLayout="dropdown"
        />
      ) : (
        <input
          name="dateOfBirth"
          type="text"
          value={format(birthDate, 'dd/MM/yyyy')}
          onClick={() => setBirthCalendarIsOpen(true)}
          readOnly
        />
      )}
      <label htmlFor="startDate">Start Date</label>
      {startCalendarIsOpen ? (
        <DayPicker
          mode="single"
          required
          selected={startDate}
          defaultMonth={startDate}
          //@ts-ignore
          onDayClick={(date) => handleCloseStartCalendar(date)}
          fromYear={1940}
          toYear={2025}
          captionLayout="dropdown"
        />
      ) : (
        <input
          name="startDate"
          type="text"
          defaultValue={format(startDate, 'dd/MM/yyyy')}
          onClick={() => setStartCalendarIsOpen(true)}
        />
      )}
      {/* <input name="startDate" type="text" /> */}
      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input name="street" type="text" />

        <label htmlFor="city">City</label>
        <input name="city" type="text" />

        <label htmlFor="state">State</label>
        <Select
          classNamePrefix="select"
          className="select"
          name="state"
          placeholder="Select a state ..."
          defaultValue={selectedState}
          //@ts-ignore
          onChange={setSelectedState}
          options={statesOptions}
        />

        <label htmlFor="zip">Zip Code</label>
        <input name="zip" type="number" />
      </fieldset>
      <label htmlFor="department">Department</label>
      <Select
        classNamePrefix="select"
        className="select"
        name="department"
        placeholder="Select a department ..."
        defaultValue={selectedDepartement}
        //@ts-ignore
        onChange={setSelectedDepartement}
        options={departementOptions}
      />
      <button type="submit">Save</button>

      {added ? (
        <div onClick={(evt) => handleModalClick(evt)}>
          <ModalComponent />
        </div>
      ) : null}
    </form>
  )
}
