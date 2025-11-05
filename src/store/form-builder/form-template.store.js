import axios from '@/plugins/axios';
import { defineStore } from 'pinia';
import SupplierContactServices from '@/services/supplier-contact.services';

export const useFormTemplateStore = defineStore('formTemplate', {
  state: () => ({
    templateList: [],
  }),
  persist: true, 
  getters: {
    getTemplateList: (state) => state.templateList,
  },
  actions: {
    
   async addTemplateList(template) {
    console.log(template,"templatetemplate")
    try{
      const  response = await axios.post('/api/FormTemplates',template);
      console.log("RESPONSE",response)
      this.templateList.push(template)
    
      
    }catch(ex){
     
    }
     
    } ,

    async setTemplateFromContact(contactID){
      const  res = await SupplierContactServices.getById(contactID)
      console.log("TEMPLATE STORE","CONTACT ID",res)
      this.templateList = JSON.parse(res.data.submittedJson)

    },
    setTemplateFromTemplate(templateID){

    },
    updateTemplateList(newList) {
     this.templateList = newList
    }
  },
})
