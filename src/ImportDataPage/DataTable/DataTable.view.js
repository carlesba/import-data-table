import { useState } from "react"

export const DataTable = (props) => {
  const { value, config, onChange } = props
  const { data, list } = value

  const handleChange = (id, fieldName, value) => {
    onChange({ type: "updateItemValue", id, fieldName, value, config })
  }
  const handleRemove = (id) => onChange({ type: "removeItem", id })

  return (
    <table>
      <thead>
        <tr style={{ outline: "1px solid black" }}>
          {config.display.map((fieldName) => (
            <th key={fieldName}>{config.fields[fieldName].name}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {list.map((itemId) => (
          <DataRow key={itemId} onRemove={() => handleRemove(itemId)}>
            {config.display.map((fieldName) => (
              <DataCell
                key={`${itemId}-${fieldName}`}
                value={data[itemId][fieldName]}
                onChange={(newValue) =>
                  handleChange(itemId, fieldName, newValue)
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
    <tr data-testid="item-row" style={{ outline: "1px solid black", position: "relative" }}>
      {children}
      <td>
        <button data-testid='remove-item' onClick={onRemove}>remove</button>
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
