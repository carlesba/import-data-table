import ImportDataPage from "./ImportDataPage";

const config = {
  fields: [
    {key: 'part_number', name: 'Part number'},
    {key: 'unit_price', name: 'unit price'},
    {key: 'quantity', name: 'quantity'},
    {key: 'uom', name: 'uom'},
    {key: 'total_cost', name: 'total cost'},
    {key: 'supplier_name', name: 'Supplier name'},
    {key: 'supplier_address', name: 'Supplier address'},
    {key: 'purchased_date', name: 'Purchased date'},
    {key: 'delivery_address', name: 'Delivery address'},
  ]
}
function App() {
  return (
    <ImportDataPage config={config} />
  );
}

export default App;
