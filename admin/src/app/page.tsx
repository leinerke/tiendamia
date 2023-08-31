'use client'

import { useEffect, useState } from 'react'
import { Table } from '../components/table'
import { useGetData } from '../useGetData'
import { getOrdersResponse } from '../interfaces'

export default function Home() {
  const [data, setData] = useState<getOrdersResponse[]>([])

  const handleSelectStatus = async (status: string) => {
    setData(await useGetData(status))
  }

  useEffect(() => {
    ;(async () => {
      setData(await useGetData())
    })()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Orders</h1>
        <Table data={data} onSelectStatus={handleSelectStatus} />
      </div>
    </main>
  )
}
