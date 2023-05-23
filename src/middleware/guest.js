import { useUserStore } from "../stores/user"
export default function guest ({  next }){
    // const userStore = useUserStore();
    // if(userStore.getToken){
    //     return next({
    //        name: 'home'
    //     })
    // }
   console.log("guest");
    return next()
   }