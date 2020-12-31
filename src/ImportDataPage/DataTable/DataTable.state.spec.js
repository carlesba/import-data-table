import { useDataTable } from './DataTable.state'
import { renderHook, act } from '@testing-library/react-hooks'

test("add an item", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { displayName: 'name' },
      value: { displayName: 'value' }
    }
  }
  const { result } = renderHook(() => useDataTable(config))
  expect(result.current.value).toEqual({
    list: [],
    data: {},
    errors: {}
  })
  const id = "anId"
  act(() => {
    result.current.addItem(id)
  })
  expect(result.current.value.data[id]).toEqual({
    id, value: '', name: ''
  })
})

test("remove an item", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { displayName: 'name' },
      value: { displayName: 'value' }
    }
  }
  const { result } = renderHook(() => useDataTable(config))
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
  expect(result.current.value.data).toEqual({
    b: { id: 'b', value: '', name: '' }
  })
})

test("update an item's field", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { displayName: 'name' },
      value: { displayName: 'value' }
    }
  }
  const { result } = renderHook(() => useDataTable(config))
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
      value: "a name",
      config
    })
  })
  expect(result.current.value.data).toEqual({
    a: { id: 'a', value: '', name: 'a name' },
    b: { id: 'b', value: '', name: '' }
  })
})
