<template>
    <div>
        <el-form :model="form" :rules="rules" ref="form" label-position="top" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Service Fee" prop="service_fee">
                <el-input type="number" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="form.contact"></el-input>
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
        name: 'CustomerForm',
        props: {
            mode: null,
            model: {}
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }
    }
</script>
