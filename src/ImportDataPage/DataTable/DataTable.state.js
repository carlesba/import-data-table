import { useReducer } from "react"
import { v4 as uuid } from "uuid"
import * as DataTableState from './models/DataTableState'
import * as DataTableItem from './models/DataTableItem'

const initialState = DataTableState.create()

function reducer(state, action) {
  switch (action.type) {
    case "updateItemValue": {
      const { config, fieldName, value, id } = action
      const item = DataTableItem.setField(
        fieldName,
        value,
        state.data[id]
      )
      const rules = config.fields[fieldName]?.rules || []
      const errors = DataTableItem.refuteItemField(
        rules,
        item
      )
      return DataTableState.updateItem(
        item,
        errors,
        state,
      )
    }
    case "addItem": {
      const { item, errors } = action
      return DataTableState.addItem(item, errors, state)
    }
    case "removeItem": {
      return DataTableState.removeItem(action.id, state)
    }
    default:
      throw new Error("unexpected action: " + action.type)
  }
}

export function useDataTable(config) {
  const [value, dispatch] = useReducer(reducer, initialState)

  const addItem = (_id) => {
    const id = _id || uuid()
    const item = DataTableItem.create(config, id)
    const errors = DataTableItem.refuteItem(config, item)
  
    dispatch({ type: "addItem", item, errors })
  }

  return { value, dispatch, config, addItem }
}