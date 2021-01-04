import { useState } from 'react'
import { ImportTable, useImportTable } from './ImportTable'
import useImportDataServer from './useImportDataServer'
import { Page, BigButton } from 'Styled/Components'
import { styled } from 'Styled'
import { DropArea } from './DropArea'
import * as CSV from 'Data/csv'
import { useNotify } from 'Notifications'

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
            price: value.unit_price,
            uom: value.uom,
            supplier_name: value.supplier_name,
            order_date: value.purchased_date,
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
    const notify = useNotify()

    const submissionStatus = (
        ImportTableState.hasErrors ||
        Server.loading ||
        ImportTableState.isEmpty
    ) ? 'disabled' : ''

    const updateTable = event => ImportTableState.dispatch(event)
    const addItem = () => ImportTableState.addItem()
    const dumpDataHandler = (data, itemId) => ImportTableState.dumpData(data, itemId)
    const submitData = async () => {
        const serverData = serverDataFromImportTable(ImportTableState.value)
        const [, error] = await Server.submit(serverData)
        if (error) {
            notify({
                title: 'Something went wrong',
                description: "Submission didn't succeed"
            })
        } else {
            notify({
                title: 'Done!',
                description: "Your data has been submitted successfully"
            })
        }
    }
    const submissionHandler = () => {
        if (ImportTableState.hasErrors) {
            return notify({
                title: 'The table cannot be submitted',
                description: "Some data needs to be fixed to enable the submission"
            })
        }
        if (Server.loading) {
            return notify({
                title: 'Hold on',
                description: "You're data is being submitted..."
            })
        }
        if (ImportTableState.isEmpty) {
            return notify({
                title: 'Nothing to submit',
                description: "Add an item to submit"
            })
        }
        submitData()
    }
    const dropFileHandler = async (file) => {
        setStatus('import')
        const data = await CSV.parseFile(file)
        ImportTableState.dumpData(data)
        setStatus('idle')
    }
    const showInformation = () => notify({
        time: 30000,
        title: "Instructions",
        description: [
            'Here you can import your data to our platform.',
            '1. Add data manually using the buttons and the inputs in this table\n',
            '2. Paste CSV data in one of the cells to dump more data faster\n',
            '3. Drop your CSV file into the page to import all your data even faster\n',
            '',
            'To discard any message, just click on it.',
        ]
    })

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
                        <BigButton type='info' onClick={showInformation}>How to</BigButton>
                        <BigButton onClick={addItem}>add item</BigButton>
                        <BigButton status={submissionStatus} onClick={submissionHandler}>Submit</BigButton>
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
