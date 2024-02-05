const prescriptionBaseUrl = apiEndpoint + "/prescription"

async function getAllPrescriptions(){
    const resp = await axios.get(prescriptionBaseUrl+"/get-all")
    return resp.data 
}

async function addPrescription(prescription){
    const resp = await axios.post(prescriptionBaseUrl, prescription)
    return resp.data
}

async function updatePrescription(prescription){
    const resp = await axios.post(prescriptionBaseUrl, prescription)
    return resp.data
}

async function deletePrescription(prescriptionId){
    const resp = await axios.delete(prescriptionBaseUrl+'/'+prescriptionId)
    return resp.data
}





