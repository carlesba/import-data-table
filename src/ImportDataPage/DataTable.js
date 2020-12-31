import { useReducer, useState } from "react"

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

  createItem(config) {
    return config.fields.reduce(
      (acc, field) => ({ ...acc, [field.key]: "" }),
      {},
    )
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
      const item = DataTableState.createItem(action.config)
      return {
        data: DataTableState.addItem(item, state.data),
      }
    }
    default:
      throw new Error("unexpected action: " + action.type)
  }
}

export function useDataTable(config) {
  const [value, dispatch] = useReducer(reducer, initialState)

  console.log('value', value)

  const addItem = () => dispatch({ type: "addItem", config })

  return { value, dispatch, config, addItem }
}

export const DataTable = (props) => {
  const { value, config, onChange } = props
  const { data } = value

  const handleChange = (row, fieldName, value) => {
    onChange({ type: "updateItemValue", row, fieldName, value })
  }

  return (
    <table>
      <thead>
        <tr style={{ outline: "1px solid black" }}>
          {config.fields.map((field) => (
            <th key={field.key}>{field.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex} style={{ outline: "1px solid black" }}>
            {config.fields.map((field) => (
              <DataCell
                key={`${rowIndex}-${field.key}`}
                value={item[field.key]}
                onChange={(newValue) =>
                  handleChange(rowIndex, field.key, newValue)
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
