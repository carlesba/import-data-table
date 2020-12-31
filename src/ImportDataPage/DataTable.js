import { useReducer, useState } from "react"
import { v4 as uuid } from "uuid"

/**
 * Item
 */
const setField = (field, value, item) => ({ ...item, [field]: value })

/**
 * Data Table State
 */
const DataTableState = {
  updateItemInList(position, value, list) {
    return list.map((item, index) => (position === index ? value : item))
  },

  addItem(item, list) {
    return list.concat(item)
  },

  createItem(config, id) {
    return config.fields.reduce(
      (acc, field) => ({ ...acc, [field.key]: "", id }),
      {},
    )
  },

  removeItem(index, _list) {
    const list = _list.concat()
    list.splice(index, 1)
    return list
  },
}

/**
 * Data Table
 */
const initialState = {
  data: [],
}
function reducer(state, action) {
  switch (action.type) {
    case "updateItemValue": {
      const currentItem = state.data[action.row]
      const item = setField(action.fieldName, action.value, currentItem)
      return {
        data: DataTableState.updateItemInList(action.row, item, state.data),
      }
    }
    case "addItem": {
      const item = DataTableState.createItem(action.config, action.id)
      return {
        data: DataTableState.addItem(item, state.data),
      }
    }
    case "removeItem": {
      return {
        data: DataTableState.removeItem(action.row, state.data),
      }
    }
    default:
      throw new Error("unexpected action: " + action.type)
  }
}

export function useDataTable(config) {
  const [value, _dispatch] = useReducer(reducer, initialState)

  console.log("value", value)

  const dispatch = (event) => {
    console.log(">", event)
    _dispatch(event)
  }
  const addItem = (id) =>
    dispatch({ type: "addItem", config, id: id || uuid() })

  return { value, dispatch, config, addItem }
}

export const DataTable = (props) => {
  const { value, config, onChange } = props
  const { data } = value

  const handleChange = (row, fieldName, value) => {
    onChange({ type: "updateItemValue", row, fieldName, value })
  }
  const handleRemove = (row) => onChange({ type: "removeItem", row })

  return (
    <table>
      <thead>
        <tr style={{ outline: "1px solid black" }}>
          {config.fields.map((field) => (
            <th key={field.key}>{field.name}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <DataRow key={item.id} onRemove={() => handleRemove(rowIndex)}>
            {config.fields.map((field) => (
              <DataCell
                key={`${item.id}-${field.key}`}
                value={item[field.key]}
                onChange={(newValue) =>
                  handleChange(rowIndex, field.key, newValue)
                }
              />
            ))}
          </DataRow>
        ))}
      </tbody>
    </table>
  )
}

function DataRow({ children, onRemove }) {
  return (
    <tr style={{ outline: "1px solid black", position: "relative" }}>
      {children}
      <td>
        <button onClick={onRemove}>remove</button>
      </td>
    </tr>
  )
}

function DataCell({ value, onChange }) {
  const [state, setState] = useState(value)
  return (
    <td>
      <input
        type="text"
        value={state}
        onChange={(event) => setState(event.target.value)}
        onBlur={() => onChange(state)}
      />
    </td>
  )
}
