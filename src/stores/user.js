import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';




export const useUserStore = defineStore('user', () => {
  const token = ref(null || localStorage.getItem('token'))
  const getToken = computed(() => token.value)
  
  function setToken(payload) {
    token.value = payload
  }
  async function login(crediential) {
    // await axios.get('../sanctum/csrf-cookie');
    let { data } = await axios.post('/login', crediential);
    if (data) {
      axios.defaults.headers.common['auth-token'] =data;
      localStorage.setItem('token', data)
      setToken(data);
      
     
    } else {
      axios.defaults.headers.common['auth-token'] = null
      localStorage.removeItem('token');
      setToken(data);
    }

  }

 

  return {  token, getToken, setToken, login,  }
})
