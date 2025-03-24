import router from "@/router";
import { Connexion } from "@/services/connexion.service";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useConnexionStore=defineStore('connexion',()=>{
    const token=ref(localStorage.getItem('access_token'))
    const errorMessage = ref('');

    async function login(email:string,password:string):Promise<void>{
        errorMessage.value = '';
        try{
            const {data}=await Connexion(email,password)
            token.value=data.access_token;
            localStorage.setItem('access_token', data.access_token);
            router.push('/')
        }
        catch(error){
            console.error('Erreur lors de la connexion :', error);
            errorMessage.value="Email ou mot de passe incorrect"
            throw error;
        }
    }
    function logOut(){
        token.value=null;
        localStorage.removeItem('access_token')
    }

    return {token,errorMessage,login,logOut}
})