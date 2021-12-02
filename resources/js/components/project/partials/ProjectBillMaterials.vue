<template>
    <div>
        <div class="header_bill_materials">
            <img :src="`/img/logo.png`" alt="">
            <span class="header_title">ASDEC BUILDERS CORPORATION</span>
        </div>
        <div class="form">
            <form action="/action_page.php" method="post">
                <div class="form-edit">
                    <div class="form-row">
                        <label>Date:</label>
                        <input type="date" id="date" name="name" class="date_material" required autocomplete="name">
                    </div>
                    <div class="form-row">
                        <label>Owner:</label>
                        <input type="text" id="name" name="name" required autocomplete="name" placeholder="Enter owner">
                    </div>
                    <div class="form-row">
                        <label>Project:</label>
                        <input type="text" id="name" name="name" required autocomplete="name" placeholder="Enter project">
                    </div>
                    <div class="form-row">
                        <label>Subject:</label>
                        <input type="text" id="sub" name="name" required autocomplete="name" placeholder="Input subject">
                    </div>
                </div>
            </form>
        </div>

        <bill-of-material-form :id="id" />
        <div class="table_wrapper">
            <table class="table table-bordered"  v-loading="loadingItemsData">
                <thead class="table-secondary">
                    <th>ITEM #</th>
                    <th>DESCRITPION</th>
                    <th>UNIT</th>
                    <th>QTY</th>
                    <th>UNIT COST</th>
                    <th>AMOUNT</th>
                    <th>Action</th>
                </thead>
                <tbody v-for="(data, index) in data" :key="index">
                    <tr>
                        <td>{{data.name}}</td>
                        <td colspan="6" style="font-weight: 600">{{data.description}}</td>
                    </tr>
                    <tr v-for="(dataList, index2) in data.bill_of_materials" :key="index2">
                        <td></td>
                        <td>{{dataList.description.name}}</td>
                        <td>{{dataList.unit}}</td>
                        <td>{{dataList.quantity}}</td>
                        <td>{{dataList.unit_cost}}</td>
                        <td>{{dataList.amount | amountEmpty}}</td>
                        <td>
                            <el-button type="danger" size="mini" @click="remove(dataList, index2, index)">Remove</el-button>
                            <el-button type="success" size="mini" @click="update(dataList)">Update</el-button>
                        </td>
                    </tr>
                    <tr class="table-light">
                        <td colspan="2" style="text-align:center; font-weight: 600">
                            Sub-Total {{data.name}} {{data | subTotal}}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr class="table-secondary">
                        <td colspan="2" style="text-align:center; font-weight: 600">Total Cost {{totalAmount}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer_material">
            <br/>
            <br/>
            <span>Submitted By:</span>
            <br/>
            <br/>
            <br/>
            <div class="company_wrapper">
                <p class="company_name">ASDEC BUILDERS CORPORATION</p>
                <small>Generator Contractor</small>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProjectBillMaterials',
    props: {
        id: null
    },
    data() {
        return  {
            form: {
                name: ''
            },
            data: [],
            loadingItemsData: false,
            total: 0
        }
    },
    created() {
        this.getMaterials()
        this.$EventDispatcher.listen('ADD_NEW_MATERIAL', data => {
            this.getMaterials();
            this.totalAmount
        })
    },
    computed: {
        totalAmount() {
            this.data.forEach(material => {
                material.bill_of_materials.forEach(item => {
                    this.total+=parseFloat(item.amount)
                })
            })

            return this.total
        }
    },
    methods: {
        async getMaterials() {
            try {
                this.loadingItemsData = true;

                const res = await this.$API.Project.getBillOfMaterials(this.id);
                this.data = res.data
                this.loadingItemsData = false;
            } catch (error) {
                console.log(error);
            }
        },
        remove(data, index2, index) {
            this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.delete(index2, index, data);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });
        },
        async delete(index2, index, data) {
            try {
                await this.$API.Project.deleteMaterial(data.id);
                this.$notify({
                    title: 'Success',
                    message: 'Successfully Deleted',
                    type: 'success'
                });
                this.data[index].bill_of_materials.splice(index2, 1);
            } catch (error) {
                console.log(error);
            }
        },
        update() {

        }
    },
    filters: {
        amountEmpty(data) {
            if(!data) {
                return '-';
            }

            return data
        },
        subTotal(value) {
            let total = 0
            value.bill_of_materials.forEach(item => {
                total+=parseFloat(item.amount)
            })

            return total
        }
    }
}
</script>
<style lang="scss" scoped>
    .header_bill_materials {
        padding: 10px;
        .header_logo {
            width: 400px;
            height: 70px;
        }

        .header_title {
            font-weight: 600;
            font-size: 30px;
            float: right;
            margin-top: 20px;
        }
    }

    input{
        border: none;
        border-bottom: 1px solid silver;
        outline:none ;
        padding-right: 80%;
        margin-top: 10px;
    }

    label{
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
    }
    .date_material {
        margin-left: 14px;
    }

    .table_wrapper{
        padding: 10px;
    }

    .table_wrapper table tbody tr td {
        padding: 10px;
    }

    .read_text_materials {
        color: red
    }
    .footer_material{

    }

    .company_wrapper{
        line-height: 0.8;
        .company_name {
            font-weight: 600;
        }
    }
</style>
