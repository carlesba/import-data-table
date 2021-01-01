import { Table, Row, Cell, Header } from './ImportTable.styled'
import * as CSV from 'Data/csv'

export const ImportTable = (props) => {
  const { value, config, onChange, onDumpData } = props
  const { data, list, errors } = value

  const handleChange = (id, fieldName, value) => {
    onChange({ type: "updateItemValue", id, fieldName, value, config })
  }
  const handleRemove = (id) => onChange({ type: "removeItem", id })

  const handlePaste = (event, itemId, fieldName) => {
    event.preventDefault();
    const content = event.clipboardData.getData("Text")
    const [ok, data] = CSV.parse(content)
    if (ok) {
      return onDumpData(data, itemId)
    }
    handleChange(itemId, fieldName, content)
  }

  return (
    <Table
      head={config.display.map((fieldName) => (
        <Header key={fieldName}>
          {config.fields[fieldName].name}
        </Header>
      ))}
    >
      {list.map((itemId) => (
        <Row key={itemId} onRemove={() => handleRemove(itemId)}>
          {config.display.map((fieldName) => (
            <Cell
              key={`${itemId}-${fieldName}`}
              value={data[itemId][fieldName]}
              onChange={(value) => handleChange(itemId, fieldName, value)}
              error={errors[itemId]?.[fieldName]}
              onPaste={(event) => handlePaste(event, itemId, fieldName)}
            />
          ))}
        </Row>
      ))}
    </Table>
  )
}
