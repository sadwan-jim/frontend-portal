import axios from 'axios';
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
     const  response = await axios.post('/api/FormTemplates',template);
     this.templateList.push(template)
    } ,
   updateTemplateList(newList) {
     this.templateList = newList
    }
  },
})
