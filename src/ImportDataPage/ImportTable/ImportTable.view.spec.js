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

test("paste CSV string in cell", () => {
  const CSVText = `11,1,1,G,1,AAA,"asdfasdf",2020-12-01,"asdfasdf"
12,1,1,G,1,AAA,"asdfasdf",2020-12-01,"asdfasdf"`
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
  const change = jest.fn()
  render(
    <ImportTable
      value={state}
      config={config}
      onDumpData={change}
    />
  )
  const cell = screen.queryAllByTestId('cell-input')[0]
  fireEvent.paste(cell, {
    preventDefault() { },
    clipboardData: {
      getData: () => CSVText
    }
  })
  expect(change).toHaveBeenCalledWith(expect.any(Array), 'a')
})
test("paste no CSV string in cell", () => {
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
  const change = jest.fn()
  render(
    <ImportTable
      value={state}
      config={config}
      onChange={change}
    />
  )
  const cell = screen.queryAllByTestId('cell-input')[0]
  const text = "text"
  fireEvent.paste(cell, {
    preventDefault() { },
    clipboardData: {
      getData: () => text
    }
  })
  expect(change).toHaveBeenCalledWith({ type: 'updateItemValue', value: text, id: 'a', fieldName: 'name', config })
})
