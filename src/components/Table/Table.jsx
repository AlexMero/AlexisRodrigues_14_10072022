import React from 'react'
import { useSelector } from 'react-redux'

export default function Table() {
  //@ts-ignore
  const employees = useSelector((state) => state.employees)
  return (
    <table className="employeesTable">
      <thead>
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Start Date</td>
          <td>Department</td>
          <td>Date Of Birth</td>
          <td>Street</td>
          <td>City</td>
          <td>State</td>
          <td>Zip Code</td>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.startDate}</td>
            <td>{employee.department}</td>
            <td>{employee.dateOfBirth}</td>
            <td>{employee.address.street}</td>
            <td>{employee.address.city}</td>
            <td>{employee.address.state}</td>
            <td>{employee.address.zip}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
