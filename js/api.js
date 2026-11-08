const MOCK_API = "https://6af032a8b9925b27ce1742d1.mockapi.io/post/";

async function getDATA(endpoint) {
    const response = await fetch(`${MOCK_API}${endpoint}`);
    const data = await response.json();
    return data;
}

async function createData(endpoint, data) {
    const response = await fetch(`${MOCK_API}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
});
    const data_ = await response.json();
    return data_;
}

async function deleteData(endpoint, id) {  
    const response = await fetch(`${MOCK_API}${endpoint}/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    return data;
}

async function updateData(endpoint, id, data) {
    const response = await fetch(`${MOCK_API}${endpoint}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
});
    const data_ = await response.json();
    return data_;
}


export { getDATA, createData, updateData, deleteData}