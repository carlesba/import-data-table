import { Table, Row, Cell, Header } from './DataTable.styled'

export const DataTable = (props) => {
  const { value, config, onChange } = props
  const { data, list, errors } = value

  const handleChange = (id, fieldName, value) => {
    onChange({ type: "updateItemValue", id, fieldName, value, config })
  }
  const handleRemove = (id) => onChange({ type: "removeItem", id })

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
            />
          ))}
        </Row>
      ))}
    </Table>
  )
}
