import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout'

export default function Search() {

    const {search} = useSearch();

  return (
    <Layout title={"Search result"}>
      

    </Layout>
  )
}
