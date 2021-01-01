import { useReducer } from "react"
import { v4 as uuid } from "uuid"
import * as ImportTableState from './models/ImportTableState'
import * as ImportTableItem from './models/ImportTableItem'

const initialState = ImportTableState.create()

function reducer(state, action) {
  switch (action.type) {
    case "updateItemValue": {
      const { config, fieldName, value, id } = action

      const item = ImportTableItem.setField(fieldName, value, state.data[id])
      const rules = config.fields[fieldName]?.rules || []
      const fieldError = ImportTableItem.refuteItemField(rules, item[fieldName])
      const errors = ImportTableItem.updateItemErrors(
        fieldName,
        fieldError,
        state.errors[id]
      )
    
      return ImportTableState.updateItem(
        item,
        errors,
        state,
      )
    }
    case "addItem": {
      const { item, errors } = action
      return ImportTableState.addItem(item, errors, state)
    }
    case "removeItem": {
      return ImportTableState.removeItem(action.id, state)
    }
    default:
      throw new Error("unexpected action: " + action.type)
  }
}

export function useImportTable(config) {
  const [value, dispatch] = useReducer(reducer, initialState)

  const addItem = (_id) => {
    const id = _id || uuid()
    const item = ImportTableItem.create(config, id)
    const errors = ImportTableItem.refuteItem(config, item)

    dispatch({ type: "addItem", item, errors })
  }
  const hasErrors = Object.keys(value.errors).length > 0
  const isEmpty = value.list.length === 0

  return { value, dispatch, config, addItem, hasErrors, isEmpty }
}
