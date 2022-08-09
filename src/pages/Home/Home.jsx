import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../../components/Form/Form'

export function Home() {
  return (
    <main>
      <h1>HRnet</h1>
      <Link to="/employees" className="button pageLink">
        View current employees
      </Link>
      <Form />
    </main>
  )
}
