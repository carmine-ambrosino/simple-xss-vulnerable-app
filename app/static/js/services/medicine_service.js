async function getAllMedicines() {
    try {
      // Upload JSON representation of the blueprint 
      const response = await fetch('../static/js/json/medicine_bp.json');
      const blueprintData = await response.json();
  
      // Extract base URL from JSON
      const medicineBaseUrl = blueprintData.url_prefix;
  
      // Full URL for the request
      const apiUrl = medicineBaseUrl + '/get-all';
  
      // Execute HTTP request using dynamic URL
      const resp = await axios.get(apiUrl);
  
      // Return data obtained from request
      return resp.data;
    } catch (error) {
      console.error('Error getAllMedicines:', error);
      throw error;
    }
}

async function addMedicine(medicine) {
    try {
        const response = await fetch('../static/js/json/medicine_bp.json');
        const blueprintData = await response.json();
   
        const medicineBaseUrl = blueprintData.url_prefix;

        const apiUrl = medicineBaseUrl;

        const resp = await axios.post(apiUrl, medicine);

        return resp.data;
      } catch (error) {
        console.error('Error addMedicine:', error);
        throw error; 
      }
}

async function updateMedicine(medicine) {
    try {
        const response = await fetch('../static/js/json/medicine_bp.json');
        const blueprintData = await response.json();
   
        const medicineBaseUrl = blueprintData.url_prefix;

        const apiUrl = medicineBaseUrl;

        const resp = await axios.post(apiUrl, medicine);

        return resp.data;
      } catch (error) {
        console.error('Error updateMedicine:', error);
        throw error; 
      }
}

async function deleteMedicine(medicineId) {
    try {
        const response = await fetch('../static/js/json/medicine_bp.json');
        const blueprintData = await response.json();
   
        const medicineBaseUrl = blueprintData.url_prefix;

        const apiUrl = medicineBaseUrl;

        const resp = await axios.delete(apiUrl+'/'+medicineId);

        return resp.data;
      } catch (error) {
        console.error('Error deleteMedicine:', error);
        throw error; 
      }
}


