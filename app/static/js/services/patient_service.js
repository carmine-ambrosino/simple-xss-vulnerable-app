const patientBaseUrl = apiEndpoint + "/patient"

async function getAllPatients(){
    const resp = await axios.get(patientBaseUrl+"/get-all-info")
    return resp.data 
}

async function addPatient(patient){
    const resp = await axios.post(patientBaseUrl, patient)
    return resp.data
}

async function updatePatient(patient){
    const resp = await axios.post(patientBaseUrl, patient)
    return resp.data
}

async function deletePatient(patientId){
    const resp = await axios.delete(patientBaseUrl+'/'+patientId)
    return resp.data
}





