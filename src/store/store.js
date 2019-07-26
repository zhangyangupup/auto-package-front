import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    tab:1,
    recommedApp:[],
    aiticles:[],
    aiApps:[],
    allApps:[],
    searchFrom:'',
    baiduSe:null,
  },
  getters:{
    getTabs(state){
      return state.tab
    },
    getBaiduSe(state){
      return state.baiduSe
    },
    getsearchFrom(state){
      return state.searchFrom
    },
    getrecommedApp(state){
      return state.recommedApp
    },
    getaiticles(state){
      return state.aiticles
    },
    getaiApps(state){
      return state.aiApps
    },
    getallApps(state){
      return state.allApps
    }
  },
  mutations: {
    setTabs(state,n){
      state.tab = n
    },
    setBaiduSe(state,n){
      state.baiduSe = n
    },
    setsearchFrom(state,n){
      state.searchFrom = n
    },
    setrecommedApp(state,arr){
      return state.recommedApp=arr
    },
    setaiticles(state,arr){
      return state.aiticles=arr
    },
    setaiApps(state,arr){
      return state.aiApps=arr
    },
    setallApps(state,arr){
      return state.allApps=arr
    }
    
  },
});
export default store;
