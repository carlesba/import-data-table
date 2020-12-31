import { useState } from "react"

export const DataTable = (props) => {
  const { value, config, onChange } = props
  const { data } = value

  const handleChange = (row, fieldName, value) => {
    onChange({ type: "updateItemValue", row, fieldName, value })
  }
  const handleRemove = (id) => onChange({ type: "removeItem", id })

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
          <DataRow key={item.id} onRemove={() => handleRemove(item.id)}>
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
