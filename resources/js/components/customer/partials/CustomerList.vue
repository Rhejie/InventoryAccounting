<template>
    <div>
        <el-card class="box-card">
            <div class="text item">
                <el-button size="mini" @click="addCustomer" type="primary">Add Customer</el-button>
                <el-input
                    size="mini"
                    placeholder="Search here....."
                    style="width:300px; float:right; margin-bottom: 10px"
                    @keyup.enter.native="applySearch"
                    v-model="search">
                </el-input>
                <el-table
                    :data="customers"
                    v-loading="loading"
                    style="width: 100%">
                        <el-table-column
                            width="70"
                            label="No."
                            :sortable="true">
                                <template slot-scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Name"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="email"
                            label="Email"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="contact"
                            label="Contact"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            label="Action">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                <el-button
                                size="mini"
                                type="text"
                                @click="askToDelete(scope.$index, scope.row)">Delete</el-button>
                            </template>
                        </el-table-column>
                </el-table>
                <global-pagination
                    :current_page="current_page"
                    :current_size="current_size"
                    :pagination="customersPagination"
                    :total="filters.total"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange">
                </global-pagination>
            </div>
        </el-card>
        <el-dialog :title="mode == 'create'? 'Add Customer' : 'Update Customer' " width="45%" :visible.sync="dialogFormVisible">
            <customer-form :mode="mode" :model="model"></customer-form>
        </el-dialog>
    </div>
</template>
<script>
    import paginate from '../../../mixin/pagination'
    export default {
        name: 'ServiceList',
        mixins: [paginate],
        data() {
            return {
                customers: [],
                customersPagination: [],
                loading: false,
                current_page: 1,
                current_size: 25,
                search: null,
                mode: '',
                model: {},
                dialogFormVisible: false
            }
        },
        created() {
            this.getCustomers()

            this.$EventDispatcher.listen('ADD_NEW_SERVICE', data => {
                this.customers.unshift(data);
                this.dialogFormVisible = false
            })

            this.$EventDispatcher.listen('UPDATE_SERVICE', data => {
                this.customers.forEach(customer  => {
                    if(customer.id == data.id) {
                        for(let key in data) {
                            customer[key] = data[key]
                        }
                    }
                })
                this.dialogFormVisible = false
            })
        },
        methods: {
            async getCustomers() {
                try {
                    this.loading = true;
                    let params = {
                        current_size: this.current_size,
                        current_page: this.current_page,
                        search: this.search,
                    };

                    const res = await this.$API.Customer.getCustomers(params);
                    this.customers = res.data.data
                    this.customersPagination = res.data
                    this.loading = false
                } catch (error) {
                    console.log(error)
                }
            },
            addCustomer() {
                this.mode = 'create'
                this.model = {}
                this.dialogFormVisible = true
            },
            handleEdit(index, data) {
                this.mode = 'update' 
                this.model = data
                this.dialogFormVisible = true
            },
            handleSizeChange(val) {
                this.current_size = val;
                this.getCustomers();
            },
            handleCurrentChange(val) {
                this.current_page = val;
                this.getCustomers();
            },
            applySearch() {
                this.getCustomers();
            },
        },
        watch: {
            search(val) {
                if( val == '') {
                    this.getCustomers();
                }
            }
        }
    }
</script>