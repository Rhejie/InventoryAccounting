<template>
    <div>
        <el-form :model="form" :rules="rules" ref="form" label-position="top" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input v-model="form.name" placeholder="Name"></el-input>
            </el-form-item>
            <el-form-item label="Contact Number" prop="contact_no">
                <el-input @keypress.native="isNumber($event)" v-model="form.contact_no" placeholder="09**********..."></el-input>
            </el-form-item>
            <el-form-item label="Contact Person" prop="contact_person">
                <el-input v-model="form.contact_person" placeholder="Contact Person"></el-input>
            </el-form-item>
            <el-form-item label="Delivery Time" prop="delivery_time">
                <el-input v-model="form.delivery_time" placeholder="Example: Every 3 Days"></el-input>
            </el-form-item>
            <el-form-item label="Address" prop="address">
                <el-input type="textarea" v-model="form.address" placeholder="Address"></el-input>
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
    name: 'SupplierForm',
    props: {
        mode: null,
        model: {}
    },
    data() {
        return {
            form: {
                name: '',
                contact_no: '',
                contact_person: '',
                delivery_time: '',
                address: ''
            },
            rules:{
                name: [
                    {required: true, message: 'Please input Name', trigger: 'blur'}
                ],
                contact_no: [
                    {required: true, message: 'Please input Contact Number', trigger: 'blur'},
                    {min: 11, max: 11, message: 'Length should be 11 ', trigger: 'blur' },
                ],
                contact_person: [
                    {required: true, message: 'Please input Contact Person', trigger: 'blur'}
                ],
                address: [
                    {required: true, message: 'Please input Address', trigger: 'blur'}
                ],
            },
            disableButton: false,
        }
    },
    created() {
        if(this.model && this.model.id) {
            this.form = {
                name: this.model.name,
                contact_no: this.model.contact_no,
                contact_person: this.model.contact_person,
                delivery_time: this.model.delivery_time,
                address: this.model.address
            }
        }

        this.$EventDispatcher.listen('handClose', data => {
            this.resetForm('form')
        });
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.mode == 'update') {
                    this.updateSupplier();
                    return
                }
                console.log('running sssss');
                this.storeSupplier();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async storeSupplier() {
            this.disableButton = true;
            try {
                let formData = new FormData();
                if(this.form.name)formData.append('name',this.form.name);
                if(this.form.contact_no)formData.append('contact_no',this.form.contact_no);
                if(this.form.contact_person)formData.append('contact_person',this.form.contact_person);
                if(this.form.address)formData.append('address',this.form.address);
                if(this.form.delivery_time)formData.append('delivery_time',this.form.delivery_time);

                const res = await this.$API.SupplierManagement.storeSupplier(formData);

                this.$EventDispatcher.fire('ADD_NEW_SUPPLIER', res.data);
                this.$notify({
                    title: 'Success',
                    message: 'Successfully Added',
                    type: 'success'
                });

                this.resetForm('form');
                this.disableButton = false;
            } catch (error) {
                console.log(error);
            }
        },
        async updateSupplier() {
            this.disableButton = true;
            try {
                let formData = new FormData();
                if(this.form.name)formData.append('name',this.form.name);
                if(this.form.contact_no)formData.append('contact_no',this.form.contact_no);
                if(this.form.contact_person)formData.append('contact_person',this.form.contact_person);
                if(this.form.address)formData.append('address',this.form.address);
                if(this.form.delivery_time)formData.append('delivery_time',this.form.delivery_time);

                const res = await this.$API.SupplierManagement.updateSupplier(this.model.id, formData);

                this.$EventDispatcher.fire('UPDATE_SUPPLIER', res.data);
                this.$notify({
                    title: 'Success',
                    message: 'Successfully Updated',
                    type: 'success'
                });
                this.disableButton = false;
            } catch (error) {
                console.log(error);
            }
        },
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            let charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }
    },
    watch: {
        model(newVal, oldVal) {
            if(newVal != oldVal) {
                this.form = {
                    name: newVal.name,
                    contact_no: newVal.contact_no,
                    contact_person: newVal.contact_person,
                    delivery_time: newVal.delivery_time,
                    address: newVal.address
                }
            }
        },
        mode(val) {
            if(val == 'create') {
                this.form = {
                    name: '',
                    contact_no: '',
                    contact_person: '',
                    delivery_time: '',
                    address: ''
                }
            }
        }
    }
}
</script>
