import Vuex from 'vuex'
import axios from 'axios'


const createStore = () => {
    return new Vuex.Store({
        state :{
            litre :[],
            
        },
        mutations:{
            
            //sets the litre prices in the store
            updateLitre(state, payload){
                const litre = {
                    petrol : payload.petrol,
                    kerosine : payload.kerosine,
                    diesel : payload.diesel
                }
                state.litre = litre
            },
            
        },
        actions : {
           
            //updates the litre
            updateLitre(context, payload){
                 
                return axios.put(`http://localhost:9090/litre/${context.state.user.branchId}`, payload).then(res => {
                    context.commit('updateLitre', res.data.result) 
                })

            },
            //gets the litre status
            getLitreInfo({commit}, payload){
                return axios.get(`http://localhost:9090/litre/${payload}`).then(res => {
                    // console.log(res.data.litre)
                    commit('updateLitre', res.data.litre)
                })
            },
            
        },
        getters : {
            
        }
    });
};

export default createStore