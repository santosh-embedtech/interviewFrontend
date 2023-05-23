import { useUserStore } from "../stores/user"
export default function auth ({ next }){
    const userStore = useUserStore();
    console.log("Auth",userStore.getToken);
    if(!userStore.getToken){
        return next({
           name: 'login'
        })
    }
   
    return next()
   }