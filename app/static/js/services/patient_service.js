async function getAllPatients() {
    try {
      const response = await fetch('../static/patient_bp.json');
      const blueprintData = await response.json();
  
      const patientBaseUrl = blueprintData.url_prefix;
  
      const apiUrl = patientBaseUrl + '/get-all-info';

      const resp = await axios.get(apiUrl);
  
      return resp.data;
    } catch (error) {
      console.error('Errore durante la richiesta di getAllPatients:', error);
      throw error; 
    }
}

async function addPatient(patient) {
    try {
        const response = await fetch('../static/patient_bp.json');
        const blueprintData = await response.json();
   
        const patientBaseUrl = blueprintData.url_prefix;

        const apiUrl = patientBaseUrl;

        const resp = await axios.post(apiUrl, patient);

        return resp.data;
      } catch (error) {
        console.error('Errore durante la richiesta di addPatient:', error);
        throw error; 
      }
}

async function updatePatient(patient) {
    try {
      const response = await fetch('../static/patient_bp.json');
      const blueprintData = await response.json();

      const patientBaseUrl = blueprintData.url_prefix;

      const apiUrl = patientBaseUrl;

      const resp = await axios.post(apiUrl, patient);

      return resp.data;
    } catch (error) {
      console.error('Errore durante la richiesta di updatePatient:', error);
      throw error; 
    }
}

async function deletePatient(patientId) {
    try {
        const response = await fetch('../static/patient_bp.json');
        const blueprintData = await response.json();
   
        const patientBaseUrl = blueprintData.url_prefix;

        const apiUrl = patientBaseUrl;

        const resp = await axios.delete(apiUrl+'/'+patientId);

        return resp.data;
      } catch (error) {
        console.error('Errore durante la richiesta di deletePatient:', error);
        throw error; 
      }
}
