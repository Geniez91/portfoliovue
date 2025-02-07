import { expect, test,describe,it } from 'vitest'
import {emailRules, emptyRules} from '../services/contact.service'


describe('emailRules',()=>{
    it('should return true if case respect email rules',()=>{
        const result=emailRules('weltmannjeremy@gmail.com');
        expect(result).toBe(true)
    })

    it('should return fals if case dont respect email rules',()=>{
        const result=emailRules('weltmann');
        expect(result).toBe('Veuillez entrer une adresse mail valide !')
    })
})

describe('emptyRules',()=>{
    it('should return true if case is not empty',()=>{
        const result=emptyRules('test')
        expect(result).toBe(true)
    })

    it('should return false if case is empty',()=>{
        const result=emptyRules('')
        expect(result).toBe(`Le champ n'est pas complété`)
    })
        
    
})