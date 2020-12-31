import { fireEvent, render, screen } from '@testing-library/react'
import { DataTable } from './DataTable.view'
import * as DataTableState from './models/DataTableState'
import * as DataTableItem from './models/DataTableItem'

test("render items", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { name: 'name' },
      value: { name: 'value' },
    }
  }
  let state = DataTableState.create()
  state = DataTableState.addItem(
    DataTableItem.create(config, "1"),
    {},
    state
  )
  state = DataTableState.addItem(
    DataTableItem.create(config, "2"),
    {},
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
    display: ['name', 'value'],
    fields: {
      name: { name: 'name' },
      value: { name: 'value' },
    }
  }
  let state = DataTableState.create()
  state = DataTableState.addItem(
    DataTableItem.create(config, "a"),
    {},
    state
  )
  state = DataTableState.addItem(
    DataTableItem.create(config, "b"),
    {},
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
