import { useDataTable } from './DataTable.state'
import { renderHook, act } from '@testing-library/react-hooks'

test("add an item", () => {
  const config = {
    fields: [
      { key: 'name', name: 'name' },
      { key: 'value', name: 'value' }
    ]
  }
  const { result } = renderHook(() => useDataTable(config))
  expect(result.current.value).toEqual({
    data: []
  })
  const id = "anId"
  act(() => {
    result.current.addItem(id)
  })
  expect(result.current.value).toEqual({
    data: [
      { id, value: '', name: '' }
    ]
  })
})

test("remove an item", () => {
  const config = {
    fields: [
      { key: 'name', name: 'name' },
      { key: 'value', name: 'value' }
    ]
  }
  const { result } = renderHook(() => useDataTable(config))
  expect(result.current.value).toEqual({
    data: []
  })
  act(() => {
    result.current.addItem('a')
  })
  act(() => {
    result.current.addItem('b')
  })
  act(() => {
    result.current.dispatch({
      type: 'removeItem', id: 'a'
    })
  })
  expect(result.current.value).toEqual({
    data: [
      { id: 'b', value: '', name: '' }
    ]
  })
})

test("update an item's field", () => {
  const config = {
    fields: [
      { key: 'name', name: 'name' },
      { key: 'value', name: 'value' }
    ]
  }
  const { result } = renderHook(() => useDataTable(config))
  expect(result.current.value).toEqual({
    data: []
  })
  act(() => {
    result.current.addItem('a')
  })
  act(() => {
    result.current.addItem('b')
  })
  act(() => {
    result.current.dispatch({
      type: 'updateItemValue',
      id: 'a',
      fieldName: "name",
      value: "switch"
    })
  })
  expect(result.current.value).toEqual({
    data: [
      { id: 'a', value: '', name: 'switch' },
      { id: 'b', value: '', name: '' }
    ]
  })
})
