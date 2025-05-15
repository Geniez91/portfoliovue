import type { IHeader } from '@/interfaces/interfaces';
import axios from 'axios'

const urlConnexion='https://portfoliovue-back-end-production.up.railway.app/auth/login'

export async function Connexion(email:string,password:string){
try{
    const result = await axios.post(urlConnexion,{email,password})
    return result
}
catch(error){
    console.error('Erreur lors de la connexion :', error);
    throw error;
}
}

export function addHeaders(token: string, formData: boolean = true) {
    return {
      Authorization: `Bearer ${token}`, 
      "Content-Type": formData ? "multipart/form-data" : "application/json",
    };
  }
  