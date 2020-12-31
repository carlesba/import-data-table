import ImportDataPage from "./ImportDataPage";

const config = {
  display: [
    'part_number',
    'unit_price',
    'quantity',
    'uom',
    'total_cost',
    'supplier_name',
    'supplier_address',
    'purchased_date',
    'delivery_address',
  ],
  fields: {
    part_number: { name: 'Part number' },
    unit_price: { name: 'unit price' },
    quantity: { name: 'quantity' },
    uom: { name: 'uom' },
    total_cost: { name: 'total cost' },
    supplier_name: { name: 'Supplier name' },
    supplier_address: { name: 'Supplier address' },
    purchased_date: { name: 'Purchased date' },
    delivery_address: { name: 'Delivery address' },
  }
}
function App() {
  return (
    <ImportDataPage config={config} />
  );
}

export default App;
