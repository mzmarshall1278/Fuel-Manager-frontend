import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state :{
            user :{
                userId :'',
                type : 'manager',
                branchId : '5de125cb75366918af187637',
                stationId : '5dde52f5bd009d27b54d3fb2'
            },
            token : null,
            litre :[],
            branch :[],
            station: [],
            states :[],
            reservoir:{},
            transactions : [],
            pumps: [],
            dailyTransactions:[],
            deliveries : []
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
                //state.deliveries.result.unshift(payload); 
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
            },
            initReservoir(state, payload){
                const reservoir = {
                    petrol : payload.petrol,
                    kerosine : payload.kerosine,
                    diesel : payload.diesel
                }
                state.reservoir = reservoir
            },
            setBranches(state, payload){
                state.states = payload
            },
            addBranch(state, payload){
                // no need to change the state. the redirection will refetch all branches from the db anyway
            },
            setToken(state, payload){
                state.token = payload
            },
            setUser(state, payload){
                state.user.userId = payload
            },
            clearToken(state){
                state.token = null;
            }
        },
        actions : {
            //for invalidating the token
            setLogoutTimer({commit}, duration){
                setTimeout(() => {
                    commit('clearToken')
                },duration)
            },
          //****todo*****nuxtserver init shoul get the litre, reservoir, pumps and user*****//
            signup({commit}, payload){
                return axios.put(`http://localhost:9090/auth/signup`, payload).then(res => {
                    console.log(res.data) 
                })
            },
            login(context, payload){
                return axios.put(`http://localhost:9090/auth/login`, payload).then(res => {
                    const hours = 60 * 60 * 2;
                    context.commit('setToken', res.data.token);
                    context.commit('setUser', res.data.userId);
                    context.dispatch('setLogoutTimer', hours * 1000);
                    localStorage.setItem('token', res.data.token); 
                    localStorage.setItem('tokenExpiration', new Date().getTime() + hours * 1000);
                    Cookie.set('jwt', res.data.token);
                    Cookie.set('tokenExpiration', new Date().getTime() + hours * 1000);
                    
                })
            },
            //auth initialization on page reload
            initAuth(context, req){
                let token;
                let exp;
                if(req){
                    if(!req.headers.cookie){
                        return;
                    }
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
                    const jwtExp = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpiration='));
                    if(!jwtCookie){
                        return;
                    }
                     token = jwtCookie.split('=')[1];  
                     exp = jwtExp.split('=')[1];
                }else{
                     token = localStorage.getItem('token');
                     exp = localStorage.getItem('tokenExpiration')

                    if(new Date().getTime() > +exp || !token){
                        return; 
                    }
                }
                
                context.dispatch('setLogoutTimer', +exp - new Date().getTime());
                context.commit('setToken', token);
                console.log("auth checked")
            },

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

            //gets the reservoir status
            getReservoir({state, commit} ){
                return axios.get(`http://localhost:9090/reservoir/${state.user.branchId}`).then(res=> {
                    commit('initReservoir', res.data.result)
                })
            },
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
            //gets a state of a branch
            getSingleBranch(state){
                return (name, id) => state.states.find(state => state._id === name).stations.find(station => station._id === id)
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
                return (oil)=>{
                    return state.litre[oil]
                }
            },
            isAuthenticated(state){
                return state.token != null
            }
        }
    });
};

export default createStore