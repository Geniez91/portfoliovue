import { Connexion } from "@/services/connexion.service";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useConnexionStore=defineStore('connexion',()=>{
    const token=ref(localStorage.getItem('access_token'))

    async function login(email:string,password:string):Promise<void>{
        try{
            const {data}=await Connexion(email,password)
            token.value=data.access_token;
            localStorage.setItem('access_token', data.access_token);
        }
        catch(error){
            console.error('Erreur lors de la connexion :', error);
            throw error;
        }
    }
    function logOut(){
        token.value=null;
        localStorage.removeItem('access_token')
    }

    return {token,login,logOut}
})