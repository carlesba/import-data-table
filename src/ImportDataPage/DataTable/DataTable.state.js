import { useReducer } from "react"
import { v4 as uuid } from "uuid"

/**
 * Item
 */
const setField = (field, value, item) => ({ ...item, [field]: value })

/**
 * Data Table State
 */
export const DataTableState = {
  create() {
    return {
      data: []
    }
  },

  addItem(item, state) {
    return {
      data: state.data.concat(item)
    }
  },

  createItem(config, id) {
    return config.fields.reduce(
      (acc, field) => ({ ...acc, [field.key]: "", id }),
      {},
    )
  },

  removeItem(id, state) {
    return {
      data: state.data.filter(item => item.id !== id)
    }
  },

  updateItem(id, fn, state) {
    return {
      data: state.data.map(item => item.id === id
        ? fn(item)
        : item
      )
    }
  }
}

/**
 * Data Table
 */
const initialState = DataTableState.create()

function reducer(state, action) {
  switch (action.type) {
    case "updateItemValue": {
      return DataTableState.updateItem(
        action.id,
        (currentValue) => setField(action.fieldName, action.value, currentValue),
        state,
      )
    }
    case "addItem": {
      const item = DataTableState.createItem(action.config, action.id)
      return DataTableState.addItem(item, state)
    }
    case "removeItem": {
      return DataTableState.removeItem(action.id, state)
    }
    default:
      throw new Error("unexpected action: " + action.type)
  }
}

export function useDataTable(config) {
  const [value, _dispatch] = useReducer(reducer, initialState)

  // console.log("value", value)

  const dispatch = (event) => {
    // console.log(">", event)
    _dispatch(event)
  }
  const addItem = (id) =>
    dispatch({ type: "addItem", config, id: id || uuid() })

  return { value, dispatch, config, addItem }
}
