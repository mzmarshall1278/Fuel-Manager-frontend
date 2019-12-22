import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state :{
            
            branch :[],
            states :[],
            },
        mutations:{
            
            setBranches(state, payload){
                state.states = payload
            },
            addBranch(state, payload){
                // no need to change the state. the redirection will refetch all branches from the db anyway
            },
        },
        actions : {
            
            // adds a branch
            addBranch({state, commit}, payload){
                return axios.post(`http://localhost:9090/branches`, {...payload,  stationId : state.user.stationId}).then(res=> {
                    commit('addBranch', res.data.result)
                })
            },
            //gets all branches
            getAllBranches({state, commit}){
                return axios.get(`http://localhost:9090/branches?stationId=${state.user.stationId}`).then(res=> {
                    // console.log(res.data.result)
                    commit('setBranches', res.data.result)
                })
            },
        },
        getters : {
            //gets preview of all branches for a given state
            branches(state){
                return name =>{
                    return state.branchesPreview.filter(branch=>{
                        return branch.state === name
                    })
                }
            },
            //gets a state of a branch
            getSingleBranch(state){
                return (name, id) => state.states.find(state => state._id === name).stations.find(station => station._id === id)
            },

            
        }
    });
};

export default createStore