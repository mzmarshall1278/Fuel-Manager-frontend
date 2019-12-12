import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state :{
            user :{
                id :'jhjfhgdgdg hxfhhc',
                type : 'manager',
                token : '09yn87lgj688itgitds3yv4d6u5bi7fn6ogibfinrl6fu',
                branchId : '5de125cb75366918af187637'
            },
            litre :[],
            branchesPreview :[
                {id : '01', branchNumber :1, name :"Main Branch", state: "Kano"},
                {id : '02', branchNumber :2, name :"BUK Branch", state: "Kano"},
                {id : '03', branchNumber :3, name :"Main Branch", state: "Kaduna"},
                {id : '04', branchNumber :4, name :"Malali Branch", state: "Kaduna"},
                {id : '05', branchNumber :5, name :"Tarauni Branch", state: "Kano"},
                {id : '06', branchNumber :6, name :"Main Branch", state: "Abuja"},
            ],
            fullBranches:[
                {id : '01', branchNumber :1, name :"Main Branch", state: "Kano", address:"No 767 Zoo road, Kano", pumps : 24, manager: "Ahmad Abbati"},
                {id : '02', branchNumber :2, name :"BUK Branch", state: "Kano", address:"No 97 Maiduguri road, Kano", pumps : 24, manager: "Ibrahim Isa"},
                {id : '03', branchNumber :3, name :"Main Branch", state: "Kaduna", address:"No 54 Isa Kaita road, Kaduna", pumps : 18, manager: "Adam Mustapha"},
                {id : '04', branchNumber :4, name :"Malali Branch", state: "Kaduna", address:"No 97 malali road, KAduna", pumps : 24, manager: "George Okowoicho"},
                {id : '05', branchNumber :5, name :"Tarauni Branch", state: "Kano", address:"No 11 Maiduguri road, Kano", pumps : 12, manager: "Muslim Musa"},
                {id : '06', branchNumber :6, name :"Main Branch", state: "Abuja", address:"No 65 Garki 2, Kalitingo street, Abuja", pumps : 24, manager: "Abdulhakeem Mustapha"},
            ],
            states :[
                {id:'kn', name:"Kano"},
                {id:'kd', name: "Kaduna"},
                {id:'abj', name : 'Abuja'}
            ],
            transactions : [],
            pumps: [],
            dailyTransactions:[],
            deliveries : [
                
            ]
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
            //initializes all daily transactionss
            initTransactions(state, payload){
                state.transactions = payload;
            },
            //initializes the deatailed transaction of a day
            setDailyTransactions(state, payload){
                state.dailyTransactions = payload
            },
            deliveries(state, payload){
                state.deliveries.result.unshift(payload); 
            },
            //initializes delivery records
            initDeliveries(state, payload){
                state.deliveries = payload
            },
            //sets the litre prices in the store
            initLiterValues(state, payload){

                const litre = {
                    petrol : payload.petrol,
                    kerosine : payload.kerosine,
                    diesel : payload.diesel
                }
                state.litre = litre
            },
            updateLitre(state, payload){
                const litre = {
                    petrol : payload.petrol,
                    kerosine : payload.kerosine,
                    diesel : payload.diesel
                }
                state.litre = litre
            }
        },
        actions:{
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
                    commit('initLiterValues', res.data.litre)
                })
            },
            //gets the logs of all deliveries
            getDeliveryLogs({commit}, payload){
                return axios.get(`http://localhost:9090/deliveries?branchId=${payload.branchId}`).then(result=> {
                    commit('initDeliveries', result.data)
                })
            },
            //adds a delivery record
            addDelivery({commit}, payload){
                return axios.post(`http://localhost:9090/deliveries`, payload).then(res => {
                    console.log(res)
                    commit('deliveries', res.data.result)
                })
            },

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
            //gets preview of all branches for a given state
            branches(state){
                return name =>{
                    return state.branchesPreview.filter(branch=>{
                        return branch.state === name
                    })
                }
            },
            //gets a single Branch
            getSingleBranch(state){
                return id => state.fullBranches.find(branch => branch.id === id)
            },
            // gets all pumps
            getPumps(state){
                return state.pumps
            },
            //gets a single pump
            getSinglePump(state, getters){
                return id =>  getters.getPumps.find(pump => pump._id === id);
            },
            //gets the price of a litre for a particular oil
            litreAt(state){
                return oil => state.litre.find(litre => litre.oil === oil)
            },
            
        }
    })
}

export default createStore