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
    part_number: {
      name: 'Part number',
      rules: {
        required: true
      }
    },
    unit_price: {
      name: 'unit price',
      rules: {
        numeric: true,
        required: true,
      }
    },
    quantity: {
      name: 'quantity',
      rules: {
        numeric: true,
        required: true
      }
    },
    uom: {
      name: 'uom',
      rules: {
        required: true,
        oneOf: {
          list: ['EA', 'G', 'M']
        }
      }
    },
    total_cost: {
      name: 'total cost',
      rules: {
        numeric: true
      }
    },
    supplier_name: {
      name: 'Supplier name',
      rules: {
        required: true
      }
    },
    supplier_address: {
      name: 'Supplier address',
      rules: {
        required: true
      }
    },
    purchased_date: {
      name: 'Purchased date',
      rules: {
        dateFormat: { format: "YYYY-MM-DD" },
        required: true,
      }
    },
    delivery_address: {
      name: 'Delivery address',
      rules: {
        required: true
      }
    },
  }
}
function App() {
  return (
    <ImportDataPage config={config} />
  );
}

export default App;
