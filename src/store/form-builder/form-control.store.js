
import { defineStore } from 'pinia'

export const useFormControlStore = defineStore('formControl', {
  state: () => ({
    controlList: [],
  }),
  persist: true, 
  getters: {
    getControlList: (state) => state.controlList,
  },
  actions: {
   updateControlList(newList) {
     this.controlList = newList
    }
  },
})
