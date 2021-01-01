import { useState } from 'react'
import { ImportTable, useImportTable } from './ImportTable'
import useImportDataServer from './useImportDataServer'
import { Page, BigButton } from 'Styled/Components'
import { styled } from 'Styled'
import { DropArea } from './DropArea'
import * as CSV from 'Data/csv'

const defaultClient = {
    async post(url, payload) {
        return new Promise(function (resolve) {
            setTimeout(resolve, 2000)
        })
    }
}
function serverDataFromImportTable(tableValues) {
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
    const ImportTableState = useImportTable(config)
    const Server = useImportDataServer(_client)
    const [status, setStatus] = useState('idle')

    const disabledSubmission = (
        ImportTableState.hasErrors ||
        Server.loading ||
        ImportTableState.isEmpty
    )

    const updateTable = event => ImportTableState.dispatch(event)
    const addItem = () => ImportTableState.addItem()
    const dumpDataHandler = (data, itemId) => ImportTableState.dumpData(data, itemId)
    const handleSubmit = async () => {
        const serverData = serverDataFromImportTable(ImportTableState.value)
        const [, error] = await Server.submit(serverData)
        if (error) {
            // notification
        } else {
            // notification
        }
    }
    const dropFileHandler = async (file) => {
        setStatus('import')
        const data = await CSV.parseFile(file)
        ImportTableState.dumpData(data)
        setStatus('idle')
    }
    return (
        <DropArea
            types={['text/csv']}
            dropMessage={status === "import" ? "Processing..." : "Drop to import"}
            onDrop={dropFileHandler}
        >
            <Page
                title="Import data"
                header={(
                    <Header>
                        <BigButton onClick={addItem}>add item</BigButton>
                        <BigButton disabled={disabledSubmission} onClick={handleSubmit}>Submit</BigButton>
                    </Header>
                )}
            >

                <ImportTable
                    value={ImportTableState.value}
                    config={ImportTableState.config}
                    onChange={updateTable}
                    onDumpData={dumpDataHandler}
                />
            </Page>
        </DropArea>
    )
}
