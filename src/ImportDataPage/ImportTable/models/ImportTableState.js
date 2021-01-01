const omit = (key, _data) => {
  const data = { ..._data }
  delete data[key]
  return data
}

export const create = () => ({
  list: [],
  data: {},
  errors: {},
})

export const addItem = (item, errors, state) => ({
  list: state.list.concat(item.id),
  data: {
    ...state.data,
    [item.id]: item
  },
  errors: {
    ...state.errors,
    [item.id]: errors
  }
})

export const removeItem = (id, state) => ({
  list: state.list.filter(itemId => itemId !== id),
  data: omit(id, state.data),
  errors: omit(id, state.errors),
})

export const updateItem = (data, errors, state) => ({
  ...state,
  data: {
    ...state.data,
    [data.id]: data
  },
  errors: !errors
    ? omit(data.id, state.errors)
    : { ...state.errors, [data.id]: errors }
})

