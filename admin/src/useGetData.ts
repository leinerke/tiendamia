export const useGetData = async (status = '') => {
  const res = await fetch(`http://localhost:3001/orders?status=${status}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
