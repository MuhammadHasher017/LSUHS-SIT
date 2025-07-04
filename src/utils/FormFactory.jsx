import AddPatientForm from '@/pages/Patients/Components/AddPatientForm';


export const getAddFormComponent = (entityType, props) => {
    const FormComponents = {
      patients: AddPatientForm,
    }[entityType];
    
    if (FormComponents) {
      return <FormComponents {...props} />;
    } else {
      return null;
    }
  };


  export const getAddModalConfig = (entityType) => {
    console.log("entityType",entityType)
    const configs = {
      patients: {
        title: 'Add New Patient',
        buttonText: 'Add Patient',
        successMessage: 'Patient added successfully!'
      },
      orders: {
        title: 'Add New Order',
        buttonText: 'Add Order',
        successMessage: 'Order added successfully!'
      },
      results: {
        title: 'Add New Result',
        buttonText: 'Add Result',
        successMessage: 'Result added successfully!'
      },
      inventory: {
        title: 'Add New Inventory Item',
        buttonText: 'Add Item',
        successMessage: 'Inventory item added successfully!'
      }
    };
    
    return configs[entityType] || {
      title: 'Add New Item',
      buttonText: 'Add Item',
      successMessage: 'Item added successfully!'
    };
  };