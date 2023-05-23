<script setup>
import { reactive, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const requiredRules = yup.string().required();
import axios from "axios"
import {useRouter} from 'vue-router';
import {useUserStore} from '../stores/user';

const uerStore = useUserStore();
const router = useRouter();
const isLoading = ref(false);
const form = reactive({
  email:'',
  password:''
});
function saveNote(){
isLoading.value=true;
uerStore.login(form).then(()=>{
  isLoading.value=false;
  console.log("Loggin success");
  router.push('/add');
}).catch(err=>{
  console.log(err);
  isLoading.value=false;
})
// axios.post('/login',form).then(({data})=>{
//   console.log("Login data",data);
//   isLoading.value=false;
  
// }).catch(err=>{
//   isLoading.value=false;
// })
}
</script>
<template>
  <div class="flex flex-col space-y-4 justify-center items-center h-screen">
    <h1 class="text-2xl font-bold">Login</h1>
    <div class="w-1/3 rounded-md border-gray-200 p-4 border">
    <Form @submit="saveNote" v-slot="{ errors }" class="w-full md">
        <div class="mb-6" >
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900"
              >UserName</label
            >
            <Field
              v-model="form.email"
              name="email"
              type="text"
              :rules="requiredRules"
              :class="
                errors.email
                  ? 'border border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500'
                  : ''
              "
              class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="test"
            />
            <ErrorMessage name="email" class="text-red-500" />
          </div>
        <div class="mb-6" >
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <Field
              v-model="form.password"
              name="password"
              type="password"
              :rules="requiredRules"
              :class="
                errors.password
                  ? 'border border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500'
                  : ''
              "
              class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="test"
            />
            <ErrorMessage name="password" class="text-red-500" />
          </div>
       
        
        <div  class="flex p-4 justify-end">
          <button
            type="submit"
            class="flex items-center justify-center px-4 py-2 space-x-2 text-white uppercase rounded-md bg-blue-500 hover:bg-blue-700 focus:outline-none"
            :disabled="isLoading"
          >
            <svg
              v-if="isLoading"
              class="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{
              isLoading ? "Saving..." :  "Login"
            }}</span>
            <!-- Login -->
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>


