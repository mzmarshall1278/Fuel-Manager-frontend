import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state :{
           
            pumps: [],
            },
        mutations:{
            addPump(state, payload){
                const pump = {
                    id : payload._id,
                    oil : payload.oil,
                    number : payload.number,
                    branch  : payload.branch
                }
                return state.pumps.push(pump)
            },
            setPumps(state, payload){
                 state.pumps = payload
            },
            
        },
        actions : {
            
            //adds a pump
            addPump({commit}, payload){
                return axios.post('http://localhost:9090/pumps', payload).then(res => {
                commit('addPump', res.data.result)
                console.log(res.data.result);
                }).catch(err => console.log(err))
            },
            //gets all pumps
            getPumps({commit},payload){
                return axios.get(`http://localhost:9090/pumps?branch=${payload}`, payload).then(res=> {
                    console.log(payload)
                    commit('setPumps', res.data.pumps)
                })
            }
        },
        getters : {
                        // gets all pumps
            getPumps(state){
                return state.pumps
            },
            //gets a single pump
            getSinglePump(state, getters){
                return id =>  getters.getPumps.find(pump => pump._id === id);
            },
        }
    });
};

export default createStore