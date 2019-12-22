import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state :{
            deliveries : []
        },
        mutations:{
           
            deliveries(state, payload){
                //state.deliveries.result.unshift(payload); 
            },
            //initializes delivery records
            initDeliveries(state, payload){
                state.deliveries = payload
            },
        },
        actions : {
           
            //gets the logs of all deliveries
            getDeliveryLogs({state, commit}){
                return axios.get(`http://localhost:9090/deliveries/${state.user.branchId}`).then(result=> {
                    commit('initDeliveries', result.data.result)
                })
            },
            //adds a delivery record
            addDelivery({state, commit}, payload){
                return axios.post(`http://localhost:9090/deliveries/${state.user.branchId}`, payload).then(res => {
                    console.log(res)
                    commit('deliveries', res.data.result)
                })
            },
        },
        getters : {
          
        }
    });
};

export default createStore