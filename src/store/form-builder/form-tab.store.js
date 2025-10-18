
import { defineStore } from 'pinia'

export const useFormTabStore = defineStore('formTab', {
  state: () => ({
    tabList: [],
  }),
  persist: true, 
  getters: {
    getTabList: (state) => state.tabList,
  },
  actions: {
   updateTabList(newList) {
    console.log(newList,"newList", this.tabList)
     this.tabList = newList
     console.log(newList,"newList", this.tabList)
    }
  },
})
