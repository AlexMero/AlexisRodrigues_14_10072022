import React, { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
// import Table from '../../components/Table/Table'

export function Employees() {
  //@ts-ignore
  const employees = useSelector((state) => state.employees)

  const gridRef = useRef()

  const sizeToFit = useCallback(() => {
    // @ts-ignore
    gridRef.current.api.sizeColumnsToFit()
  }, [])

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = []
    // @ts-ignore
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId())
    })
    // @ts-ignore
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader)
  }, [])

  console.log(employees)
  // const [rowData] = useState([
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxster', price: 72000 },
  // ])
  const [rowData] = useState(employees)
  const defaultColDef = {
    resizable: true,
  }
  const [columnDefs] = useState([
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'startDate' },
    { field: 'department' },
    { field: 'dateOfBirth' },
    { field: 'address.street', headerName: 'Street' },
    { field: 'address.city', headerName: 'City' },
    { field: 'address.state', headerName: 'State' },
    { field: 'address.zip', headerName: 'Zip Code' },
  ])

  return (
    <main className="employeesMain">
      <h1>Employees List</h1>
      <Link to="/" className="button pageLink">
        Home
      </Link>
      <div className="ag-theme-alpine" style={{ height: '70%', width: '60%' }}>
        <AgGridReact
          // @ts-ignore
          ref={gridRef}
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
      <div className="buttonContainer">
        <label>Table control :</label>
        <button onClick={sizeToFit}>Fit in table</button>
        <button onClick={() => autoSizeAll(false)}>Auto-size columns</button>
      </div>
    </main>
  )
}
