import { useState } from 'react'

export default function useImportDataServer(client) {
  const [status, setStatus] = useState('idle')

  async function submit(data) {
      console.log('submitting: ', data)
      setStatus('loading')
      try {
          await client.post('endpoint', data)
          setStatus('idle')
          return [true]
      } catch (error) {
          setStatus('idle')
          return [false, error.message]
      }
  }

  return {
      loading: status === 'loading',
      submit
  }
}
