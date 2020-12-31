import { fireEvent, render, screen } from '@testing-library/react'
import { DataTable } from './DataTable.view'
import { DataTableState } from './DataTable.state'

test("render items", () => {
  const config = {
    fields: [
      { key: 'name', name: 'name' },
      { key: 'value', name: 'value' }
    ]
  }
  let state = DataTableState.create()
  state = DataTableState.addItem(
    DataTableState.createItem(config, "1"),
    state
  )
  state = DataTableState.addItem(
    DataTableState.createItem(config, "2"),
    state
  )
  const change = jest.fn()
  render(
    <DataTable
      value={state}
      config={config}
      onChange={change}
    />
  )
  const rows = screen.queryAllByTestId('item-row')
  expect(rows.length).toBe(2)
})

test("remove an item", () => {
  const config = {
    fields: [
      { key: 'name', name: 'name' },
      { key: 'value', name: 'value' }
    ]
  }
  let state = DataTableState.create()
  state = DataTableState.addItem(
    DataTableState.createItem(config, "a"),
    state
  )
  state = DataTableState.addItem(
    DataTableState.createItem(config, "b"),
    state
  )
  const change = jest.fn()
  render(
    <DataTable
      value={state}
      config={config}
      onChange={change}
    />
  )
  const removeButtons = screen.queryAllByTestId('remove-item')
  fireEvent.click(removeButtons[1])
  expect(change).toHaveBeenCalledWith({
    type: 'removeItem', id: "b"
  })
})
