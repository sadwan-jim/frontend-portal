
import axios from '@/plugins/axios';
import { defineStore } from 'pinia';


export const useSupplierContactStore = defineStore('supplierContact', {
  state: () => ({
    supplierContactList: [],
  }),
  persist: true, 
  getters: {
    getSupplierContactList: (state) => state.supplierContactList,
  },
  actions: {
    async fetchSupplierContactList(){
       try {
            const response = await axios.get('/api/SupplierContacts');
            console.log("API RESPONSE",)
            this.supplierContactList = response.data;
        } catch (error) {
            console.error('Error fetching supplier contacts:', error);
        }
    },
    async addSupplierContact(contact) {
          try {
             console.log(contact,"API RESPONSE")
             const response = await axios.post('/api/SupplierContacts',contact);
            console.log(contact,"API RESPONSE",response)
            this.supplierContactList.push(contact);
        } catch (error) {
            console.error('Error fetching supplier contacts:', error);
        }
        
    },

    removeSupplierContact(id) {
        this.supplierContactList = this.supplierContactList.filter(c => c.id !== id);
    },

    updateSupplierContact(contact){
        this.supplierContactList = this.supplierContactList.map(x=>{
            if(x.id==contact.id){
                return { ...contact}
            }

            return {...x}
        })
    },

    updateSupplierContactList(newList) {
        this.supplierContactList = newList;
    }
  },
})
