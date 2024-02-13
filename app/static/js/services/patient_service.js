async function getAllPatients() {
    try {
      const response = await fetch('../static/js/json/patient_bp.json');
      const blueprintData = await response.json();
  
      const patientBaseUrl = blueprintData.url_prefix;
  
      const apiUrl = patientBaseUrl + '/get-all-info';

      const resp = await axios.get(apiUrl);
  
      return resp.data;
    } catch (error) {
      console.error('Errore getAllPatients:', error);
      throw error; 
    }
}

async function getAllInfoPatientFromFiscalCode(fiscal_code) {
  try {
    const response = await fetch('../static/js/json/patient_bp.json');
    const blueprintData = await response.json();

    const patientBaseUrl = blueprintData.url_prefix;

    const apiUrl = patientBaseUrl + '/' + fiscal_code;

    const resp = await axios.get(apiUrl);

    return resp.data;
  } catch (error) {
    console.error('Error getAllPatients:', error);
    throw error; 
  }
}

async function addPatient(patient) {
    try {
        const response = await fetch('../static/js/json/patient_bp.json');
        const blueprintData = await response.json();
   
        const patientBaseUrl = blueprintData.url_prefix;

        const apiUrl = patientBaseUrl;

        const resp = await axios.post(apiUrl, patient);

        return resp.data;
      } catch (error) {
        console.error('Error addPatient:', error);
        throw error; 
      }
}

async function updatePatient(patient) {
    try {
      const response = await fetch('../static/js/json/patient_bp.json');
      const blueprintData = await response.json();

      const patientBaseUrl = blueprintData.url_prefix;

      const apiUrl = patientBaseUrl;

      const resp = await axios.post(apiUrl, patient);

      return resp.data;
    } catch (error) {
      console.error('Error updatePatient:', error);
      throw error; 
    }
}

async function deletePatient(patientId) {
    try {
        const response = await fetch('../static/js/json/patient_bp.json');
        const blueprintData = await response.json();
   
        const patientBaseUrl = blueprintData.url_prefix;

        const apiUrl = patientBaseUrl;

        const resp = await axios.delete(apiUrl+'/'+patientId);

        return resp.data;
      } catch (error) {
        console.error('Error deletePatient:', error);
        throw error; 
      }
}
