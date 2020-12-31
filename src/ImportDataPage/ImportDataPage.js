import { DataTable, useDataTable } from './DataTable'
import useImportDataServer from './useImportDataServer'

const defaultClient = {
    async post(url, payload) {
        return new Promise(function (resolve) {
            setTimeout(resolve, 2000)
        })
    }
}
function serverDataFromDataTable(tableValues) {
    return tableValues.list.map(id => {
        const value = tableValues.data[id]
        return {
            part_number: value.part_number,
            price: value.price,
            uom: value.uom,
            supplier_name: value.supplier_name,
            order_date: value.order_date,
            delivery_address: value.delivery_address,
        }
    })
}

export default function ImportDataPage({ config, _client = defaultClient }) {
    const DataTableState = useDataTable(config)
    const Server = useImportDataServer(_client)

    const disabledSubmission = DataTableState.hasErrors || Server.loading

    const updateTable = event => DataTableState.dispatch(event)
    const addItem = () => DataTableState.addItem()
    const handleSubmit = async () => {
        const serverData = serverDataFromDataTable(DataTableState.value)
        const [, error] = await Server.submit(serverData)
        if (error) {
            // notification
        } else {
            // notification
        }
    }

    return (
        <div>
            <h1>Import data</h1>
            <DataTable
                value={DataTableState.value}
                config={DataTableState.config}
                onChange={updateTable}
            />
            <button onClick={addItem}>add item</button>
            <button disabled={disabledSubmission} onClick={handleSubmit}>Submit</button>
        </div>
    )
}
