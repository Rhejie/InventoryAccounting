export default {
    getCustomers(params) {
        return axios.get(`/customer/get-customers?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
    },
    storeCustomer(data) {
        return axios.post('/customer/store-customer', data)
    },
    updateCustomer(id, data) {
        return axios.post(`/customer/update-customer/${id}`, data)
    },
    deleteCustomer(id) {
        return axios.post(`/customer/delete-customer/${id}`)
    }
}