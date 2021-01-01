import { useImportTable } from './ImportTable.state'
import { renderHook, act } from '@testing-library/react-hooks'

test("add an item", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { displayName: 'name', rules: { required: true } },
      value: { displayName: 'value' }
    }
  }
  const { result } = renderHook(() => useImportTable(config))
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
  expect(result.current.value.errors).toEqual({
    [id]: {
      name: expect.any(String)
    }
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
  const { result } = renderHook(() => useImportTable(config))
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
  expect(result.current.value.errors).toEqual({
    b: {}
  })
})

test("update an item's field", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { displayName: 'name', rules: { required: true } },
      value: { displayName: 'value' }
    }
  }
  const { result } = renderHook(() => useImportTable(config))
  act(() => {
    result.current.addItem('a')
  })
  act(() => {
    result.current.addItem('b')
  })
  expect(result.current.value.errors).toEqual({
    a: { name: expect.any(String) },
    b: { name: expect.any(String) },
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
  expect(Object.keys(result.current.value.errors)).toEqual(["b"])
  expect(result.current.value.errors).toEqual({
    b: { name: expect.any(String) },
  })
})
