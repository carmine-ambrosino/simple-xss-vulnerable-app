async function getAllPrescriptions() {
    try {
      const response = await fetch('../static/prescription_bp.json');
      const blueprintData = await response.json();
  
      const prescriptionBaseUrl = blueprintData.url_prefix;
  
      const apiUrl = prescriptionBaseUrl + '/get-all';

      const resp = await axios.get(apiUrl);
  
      return resp.data;
    } catch (error) {
      console.error('Error getAllPrescriptions:', error);
      throw error; 
    }
}

async function addPrescription(prescription) {
    try {
        const response = await fetch('../static/prescription_bp.json');
        const blueprintData = await response.json();
   
        const prescriptionBaseUrl = blueprintData.url_prefix;

        const apiUrl = prescriptionBaseUrl;

        const resp = await axios.post(apiUrl, prescription);

        return resp.data;
      } catch (error) {
        console.error('Error addPrescription:', error);
        throw error; 
      }
}

async function updatePrescription(prescription) {
    try {
        const response = await fetch('../static/prescription_bp.json');
        const blueprintData = await response.json();
   
        const prescriptionBaseUrl = blueprintData.url_prefix;

        const apiUrl = prescriptionBaseUrl;

        const resp = await axios.post(apiUrl, prescription);

        return resp.data;
      } catch (error) {
        console.error('Error updatePrescription:', error);
        throw error; 
      }
}

async function deletePrescription(prescriptionId) {
    try {
        const response = await fetch('../static/prescription_bp.json');
        const blueprintData = await response.json();
   
        const prescriptionBaseUrl = blueprintData.url_prefix;

        const apiUrl = prescriptionBaseUrl;

        const resp = await axios.delete(apiUrl+'/'+prescriptionId);

        return resp.data;
      } catch (error) {
        console.error('Error deletePrescription:', error);
        throw error; 
      }
}




