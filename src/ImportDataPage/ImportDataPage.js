import { DataTable, useDataTable } from './DataTable'
import useImportDataServer from './useImportDataServer'
import { Page, BigButton } from 'Styled/Components'
import { styled } from 'Styled'

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

const Header = styled('div', {
    diplay: 'flex',
    flexDirection: 'horizontal'
})

export default function ImportDataPage({ config, _client = defaultClient }) {
    const DataTableState = useDataTable(config)
    const Server = useImportDataServer(_client)

    const disabledSubmission = (
        DataTableState.hasErrors ||
        Server.loading ||
        DataTableState.isEmpty
    )

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
        <Page
            title="Import data"
            header={(
                <Header>
                    <BigButton onClick={addItem}>add item</BigButton>
                    <BigButton disabled={disabledSubmission} onClick={handleSubmit}>Submit</BigButton>
                </Header>
            )}
        >
            <DataTable
                value={DataTableState.value}
                config={DataTableState.config}
                onChange={updateTable}
            />
        </Page>
    )
}
