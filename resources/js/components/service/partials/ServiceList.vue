<template>
    <div>
        <el-card class="box-card">
            <div class="text item">
                <el-button size="mini" @click="addService" type="primary">Add Service</el-button>
                <el-input
                    size="mini"
                    placeholder="Search here....."
                    style="width:300px; float:right; margin-bottom: 10px"
                    @keyup.enter.native="applySearch"
                    v-model="search">
                </el-input>
                <el-table
                    :data="services"
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
                            prop="service_fee"
                            label="Service Fee"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="tax_id"
                            label="Tax"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="category_id"
                            label="Category"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="unit_id"
                            label="Unit"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="Type"
                            :sortable="true">
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="Description"
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
                    :pagination="servicesPagination"
                    :total="filters.total"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange">
                </global-pagination>
            </div>
        </el-card>
        <el-dialog :title="mode == 'create'? 'Add Service' : 'Update Service' " width="45%" :visible.sync="dialogFormVisible">
            <service-form :mode="mode" :model="model"></service-form>
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
                services: [],
                servicesPagination: [],
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
            this.getServices()

            this.$EventDispatcher.listen('ADD_NEW_SERVICE', data => {
                this.services.unshift(data);
                this.dialogFormVisible = false
            })

            this.$EventDispatcher.listen('UPDATE_SERVICE', data => {
                this.services.forEach(service  => {
                    if(service.id == data.id) {
                        for(let key in data) {
                            service[key] = data[key]
                        }
                    }
                })
                this.dialogFormVisible = false
            })
        },
        methods: {
            async getServices() {
                try {
                    this.loading = true;
                    let params = {
                        current_size: this.current_size,
                        current_page: this.current_page,
                        search: this.search,
                    };

                    const res = await this.$API.Service.getServices(params);
                    this.services = res.data.data
                    this.servicesPagination = res.data
                    this.loading = false
                } catch (error) {
                    console.log(error)
                }
            },
            addService() {
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
                this.getServices();
            },
            handleCurrentChange(val) {
                this.current_page = val;
                this.getServices();
            },
            applySearch() {
                this.getServices();
            },
        },
        watch: {
            search(val) {
                if( val == '') {
                    this.getServices();
                }
            }
        }
    }
</script>