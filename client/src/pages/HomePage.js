import React from 'react'
import Layout from '../components/Layout/layout.js'
import { useAuth } from '../context/auth.js'

export default function HomePage() {

  const {auth} = useAuth();

  return (
    <Layout>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  )
}
