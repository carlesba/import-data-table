import { fireEvent, render, screen } from '@testing-library/react'
import { ImportTable } from './ImportTable.view'
import * as ImportTableState from './models/ImportTableState'
import * as ImportTableItem from './models/ImportTableItem'

test("render items", () => {
  const config = {
    display: ['name', 'value'],
    fields: {
      name: { name: 'name' },
      value: { name: 'value' },
    }
  }
  let state = ImportTableState.create()
  state = ImportTableState.addItem(
    ImportTableItem.create(config, "1"),
    {},
    state
  )
  state = ImportTableState.addItem(
    ImportTableItem.create(config, "2"),
    {},
    state
  )
  const change = jest.fn()
  render(
    <ImportTable
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
  let state = ImportTableState.create()
  state = ImportTableState.addItem(
    ImportTableItem.create(config, "a"),
    {},
    state
  )
  state = ImportTableState.addItem(
    ImportTableItem.create(config, "b"),
    {},
    state
  )
  const change = jest.fn()
  render(
    <ImportTable
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
