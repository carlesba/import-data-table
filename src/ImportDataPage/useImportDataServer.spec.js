import useImportDataServer from './useImportDataServer'
import { renderHook, act } from '@testing-library/react-hooks'

test("submission succeeds", async () => {
  const client = {
    post: jest.fn(() => Promise.resolve())
  }
  const { result } = renderHook(() => useImportDataServer(client))

  expect(result.current.loading).toBe(false)
  const data = {}
  let response
  await act(async () => {
    response = await result.current.submit(data)
  })

  expect(response).toEqual([true])
})

test("submission fails", async () => {
  const client = {
    post: jest.fn(() => Promise.reject({ message: "whatever" }))
  }
  const { result } = renderHook(() => useImportDataServer(client))

  expect(result.current.loading).toBe(false)
  const data = {}
  let response
  await act(async () => {
    response = await result.current.submit(data)
  })

  expect(response).toEqual([false, 'whatever'])
})

