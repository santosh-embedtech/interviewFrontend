<script setup>
import { ref,onMounted } from 'vue'
import {RouterLink} from 'vue-router'
import axios from 'axios';
const notes =ref([]);
//load data
onMounted(() => {
  getAllNotes();
})
function deleteNoteById(id){
  axios.delete(`/note/${id}`).then(({data})=>{
    getAllNotes();
    console.log("response",data);
  }).catch(err=>{
    notes.value=[];
    console.log(err);
  })
}
function getAllNotes(){
  axios.get('/note').then(({data})=>{
    notes.value=data;
    console.log("response",data);
  }).catch(err=>{
    notes.value=[];
    console.log(err);
  })
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
  <div class="container">
    <div class="flex justify-between px-4">
      <h1 class="text-3xl font-bold">All Notes</h1>
      <RouterLink to="/add" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">Add Note</RouterLink>
    </div>
    
    <table
      class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
    >
      <thead class="text-white">
        <tr
          class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
        >
          <th class="p-3 text-left">Title</th>
          <th class="p-3 text-left">Notes</th>
          <th class="p-3 text-left" width="110px">Actions</th>
        </tr>
        
      </thead>
      <tbody class="flex-1 sm:flex-none">
        <tr v-for="(note,i) in notes" :key="i" class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
          <td class="border-grey-light border hover:bg-gray-100 p-3">{{ note.title }}</td>
          <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
           {{ note.note }}
          </td>
          <td
            class="flex space-x-2 border-grey-light border  p-3 text-red-400 hover:text-red-600 "
          >
           <RouterLink :to="`/edit/${i}`" class="hover:text-red-700 cursor-pointer">Edit</RouterLink> <span @click="deleteNoteById(i)" class="hover:text-red-700 cursor-pointer">Delete</span>
          </td>
        </tr>
        
      </tbody>
    </table>
  </div>
</div>
</template>
<style  scoped>
  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
  }
</style>
