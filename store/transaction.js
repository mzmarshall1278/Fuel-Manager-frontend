import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state :{
            transactions : [],
            dailyTransactions:[],
        },
        mutations:{
            
            //initializes all daily transactionss
            initTransactions(state, payload){
                state.transactions = payload;
            },
            //initializes the deatailed transaction of a day
            setDailyTransactions(state, payload){
                state.dailyTransactions = payload
            },
            
        },
        actions : {
            //gets the transaction details of a single day
            getTransactionDetail({commit}, payload){
                
                return axios.get(`http://localhost:9090/sales/${payload.branch}?date=${payload.date}`).then(res =>{
                    //console.log(res)
                    commit('setDailyTransactions', res.data.result)
                })
            },
            //gets all sales snapshot
            getDailySaleDetail({commit},payload){
                //
                return axios.get(`http://localhost:9090/sales?branchId=${payload.branch}&page=${payload.page}`).then(res=>{
                    //console.log(res.data);
                    commit('initTransactions', res.data)
                })
            },
            //makes a sale/transaction
            addSale({commit}, payload){
                console.log(payload)
                return axios.post('http://localhost:9090/sales', payload).then(res => {
                    console.log(res.data)
                })
            },

            //Updates the sale when night reading is taken
            updateSale({commit}, payload){
                return axios.put('http://localhost:9090/sales', payload).then(res => {
                    console.log(res.data)
                })
            },
            
        },
        getters : {
            
        }
    });
};

export default createStore