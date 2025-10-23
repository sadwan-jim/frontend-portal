import axios from '@/plugins/axios';
import { defineStore } from 'pinia';

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
   updateTemplateList(newList) {
     this.templateList = newList
    }
  },
})
