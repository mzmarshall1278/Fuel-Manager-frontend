import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state :{
            reservoir:{},
            
        },
        mutations:{
            
            initReservoir(state, payload){
                const reservoir = {
                    petrol : payload.petrol,
                    kerosine : payload.kerosine,
                    diesel : payload.diesel
                }
                state.reservoir = reservoir
            },
        },
        actions : {
            //gets the reservoir status
            getReservoir({state, commit} ){
                return axios.get(`http://localhost:9090/reservoir/${state.user.branchId}`).then(res=> {
                    commit('initReservoir', res.data.result)
                })
            },
        },
        getters : {
            
        }
    });
};

export default createStore