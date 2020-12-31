import { DataTable, useDataTable } from './DataTable'

export default function ImportDataPage({ config }) {
    const DataTableState = useDataTable(config)
    return (
        <div>
            <h1>Import data</h1>
            <DataTable
                value={DataTableState.value}
                config={DataTableState.config}
                onChange={event => DataTableState.dispatch(event)}
            />
            <button onClick={() => DataTableState.addItem()}>add item</button>
        </div>
    )
}
