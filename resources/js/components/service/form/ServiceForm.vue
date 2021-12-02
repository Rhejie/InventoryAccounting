<template>
    <div>
        <el-form :model="form" :rules="rules" ref="form" label-position="top" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Service Fee" prop="service_fee">
                <el-input type="number" v-model="form.service_fee"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="disableButton" @click="submitForm('form')">Save</el-button>
                <el-button :disabled="disableButton" v-if="mode != 'update'" @click="resetForm('form')">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'ServiceForm',
        props: {
            mode: null,
            model: {}
        },
        data() {
            return {
                form: {
                    name: null,
                    description: null,
                    service_fee: null,
                    tax_id: null,
                    category_id: null,
                    unit_id: null,
                    type: 'Service',
                },
                rules: {
                    name: [
                        {required: true, message: 'Please input Name', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: 'Please input Description', trigger: 'blur'}
                    ],
                    service_fee: [
                        {required: true, message: 'Please input Service Fee', trigger: 'blur'}
                    ]
                },
                disableButton: false,
            }
        },
        created() {
            if(this.model && this.model.id) {
                this.form = {
                    name: this.model.name,
                    description: this.model.description,
                    service_fee: this.model.service_fee,
                    tax_id: null,
                    category_id: null,
                    unit_id: null,
                    type: 'Service',
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.mode == 'update') {
                        this.updateService();
                        return
                    }
                    this.storeService();
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async storeService() {
                try {
                    const res = await this.$API.Service.storeService(this.form);
                    this.$EventDispatcher.fire('ADD_NEW_SERVICE', res.data);
                    this.$notify({
                        title: 'Success',
                        message: 'Successfully Added',
                        type: 'success'
                    });
                } catch (error) {
                    console.log(error)
                }
            },
            async updateService() {
                try {
                    const res = await this.$API.Service.updateService(this.model.id, this.form)
                    this.$EventDispatcher.fire('UPDATE_SERVICE', res.data)
                    this.$notify({
                        title: 'Success',
                        message: 'Successfully Added',
                        type: 'success'
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        },
        watch: {
            mode(val) {
                if(val) {
                    if(val == 'create') {
                        this.form = {
                            name: '',
                            description: '',
                            service_fee: '',
                        }
                    }
                }
            },
            model(newVal, oldVal) {
                if(newVal != oldVal) {
                    this.form = {
                        name: newVal.name,
                        description: newVal.description,
                        service_fee: newVal.service_fee,
                        type: 'Service',
                        tax_id: null,
                        category_id: null,
                        unit_id: null,
                    }
                }
            }
        }
    }
</script>