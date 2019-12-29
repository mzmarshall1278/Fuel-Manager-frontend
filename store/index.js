import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state :{
            user : '',
            token : null,
            litre :[],
            branch :[],
            station: [],
            states :[],
            stateBranches:[],
            reservoir:{},
            transactions : [],
            pumps: [],
            dailyTransactions:[],
            deliveries : [],
            error : null,
            loading: false,
        },
        mutations:{
            setLoading(state, payload){
                state.loading = payload
            },
            setError(state, payload){
                state.error = payload
            },
            clearError(state){
                state.error = null
            },
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
            setStateBranches(state, payload){
                state.stateBranches = payload
            },
            addBranch(state, payload){
                // no need to change the state. the redirection will refetch all branches from the db anyway
            },
            setToken(state, payload){
                state.token = payload
            },
            setUser(state, payload){
                state.user = payload
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
                context.commit('clearError');
                context.commit('setLoading', true);
                return axios.put(`http://localhost:9090/auth/login`, payload).then(res => {
                    const hours = 60 * 60 * 2;
                    context.commit('setToken', res.data.token);
                    context.commit('setUser', {userId:res.data.userId, branchId:res.data.branchId, stationId:res.data.branchId, state:res.data.state, userType: res.data.userType});
                    // context.dispatch('setLogoutTimer', hours * 1000);
                    localStorage.setItem('token', res.data.token); 
                    localStorage.setItem('userId', res.data.userId); 
                    localStorage.setItem('branchId', res.data.branchId); 
                    localStorage.setItem('stationId', res.data.stationId); 
                    localStorage.setItem('userType', res.data.userType); 
                    localStorage.setItem('state', res.data.state);                    
                    localStorage.setItem('tokenExpiration', new Date().getTime() + hours * 1000);
                    Cookie.set('jwt', res.data.token);
                    Cookie.set('userId', res.data.userId);
                    Cookie.set('userType', res.data.userType);
                    Cookie.set('branchId', res.data.branchId);
                    Cookie.set('stationId', res.data.stationId);
                    Cookie.set('state', res.data.state);
                    Cookie.set('tokenExpiration', new Date().getTime() + hours  * 1000);
                    context.commit('setLoading', false);
                    
                }).catch(err => {
                    context.commit('setLoading', false);
                    console.log(err);
                    context.commit('setError', "The information you entered was not correct");

                });
            },
            //auth initialization on page reload
            
            initAuth(context, req){
                let token;
                let userId;
                let userType;
                let branchId;
                let stationId;
                let state; 
                let exp;
      
                if(req){
                    if(!req.headers.cookie){
                        console.log("req, but no headers")
                        return;
                    }
                    console.log("req");
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
                    const jwtExp = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpiration='));
                    
                    if(!jwtCookie){
                        return;
                    }
                    userId = req.headers.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1];
                    userType = req.headers.cookie.split(';').find(c => c.trim().startsWith('userType=')).split('=')[1];
                    branchId = req.headers.cookie.split(';').find(c => c.trim().startsWith('branchId=')).split('=')[1];
                    stationId = req.headers.cookie.split(';').find(c => c.trim().startsWith('stationId=')).split('=')[1];
                    state = req.headers.cookie.split(';').find(c => c.trim().startsWith('state=')).split('=')[1];
                    token = jwtCookie.split('=')[1];  
                    exp = jwtExp.split('=')[1];
                }
                 else{
                    console.log('no req')
                    userId = localStorage.getItem('userId');
                    userType = localStorage.getItem('userType');
                    branchId = localStorage.getItem('branchId');
                    stationId = localStorage.getItem('stationId');
                    state = localStorage.getItem('state');
                    token = localStorage.getItem('token');
                    exp = localStorage.getItem('tokenExpiration')
                }
                
                if(new Date().getTime() > +exp || !token){
                    
                    context.commit('clearToken');
                   return; 
               }
                context.commit('setUser', {userId, branchId, stationId, state, userType});
                context.commit('setToken', token);
            },

            // adds a branch
            addBranch({state, commit}, payload){
                return axios.post(`http://localhost:9090/branches`, {...payload,  stationId : state.user.stationId}).then(res=> {
                    commit('addBranch', res.data.result)
                })
            },
            //gets all branches
            getAllBranches({state, commit}){
                return axios.get(`http://localhost:9090/branches?stationId=${state.user.stationId}`, {
                    headers:{
                        Authorization: `Bearer ${state.token}`
                    }
                }).then(res=> {
                    // console.log(res.data.result)
                    commit('setBranches', res.data.result)
                })
            },
            getStateBranches(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError')
                return axios.get(`http://localhost:9090/branches/state/${context.state.user.stationId}?page=${payload.page}&state=${payload.state}`).then(res => {
                    context.commit('setStateBranches', res.data);
                    context.commit('setLoading', false);
                }).catch(err => {
                    console.log(err);
                    context.commit('setLoading', false);
                    context.commit('setError', "Your Branches Could Not Be Fetched")
                });
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
            getLitreInfo({state, commit}){
                commit('clearError');
                commit('setLoading', true);
                return axios.get(`http://localhost:9090/litre/${state.user.branchId}`).then(res => {
                    // console.log(res.data.litre)
                    commit('setLoading', false);
                    commit('initLiterValues', res.data.litre)
                }).catch(err => {
                    commit('setLoading', false);
                    commit('setError', "Something went wrong. litre Status could not be fetched");
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
            addSale({state, commit}, payload){
                commit('clearError');
                commit('setLoading', true);
                console.log(payload)
                return axios.post('http://localhost:9090/sales', {...payload, branchId:state.user.branchId}).then(res => {
                    commit('setLoading', false);
                    console.log(res.data)
                }).catch(err => {
                    commit('setLoading', false);
                    commit('setError', "Sorry, This reading could not be saved. Try Again");
                })
            },

            //Updates the sale when night reading is taken
            updateSale({state, commit}, payload){
                return axios.put('http://localhost:9090/sales', {...payload, branchId:state.user.branchId}).then(res => {
                    console.log(res.data)
                })
            },
            //adds a pump
            addPump({state, commit}, payload){
                commit('setLoading',true);
                commit('clearError')
                return axios.post('http://localhost:9090/pumps', {...payload, branchId : state.user.branchId}).then(res => {
                    //console.log(res.data.result);
                commit('addPump', res.data.result)
                commit('setLoading', false)
                //console.log(res.data.result);
                }).catch(err => {
                    commit('setLoading', false)
                    commit('setError', "Sorry, this Pump could not be added. please try again")
                })
            },
            //gets all pumps
            getPumps({state, commit}){
                commit('clearError');
                commit('setLoading', true);
                return axios.get(`http://localhost:9090/pumps?branch=${state.user.branchId}`).then(res=> {
                    //console.log(res.data)
                    commit('setLoading' ,false)
                    commit('setPumps', res.data.pumps)
                }).catch(err => {
                    commit('setLoading', false)
                    commit('setError', "Sorry, Pumps could not be fetched. try again")
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
                if(state.user.userType === 'owner'){
                    return (name, id) => state.states.find(state => state._id === name).stations.find(station => station._id === id)
                }else{
                    return (id) => state.stateBranches.result.find(state => state._id === id);
                }
                
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
            },
            loading(state){
                return state.loading
            },
            error(state){
                return state.error
            },
            user(state){
                return state.user
            }
        }
    });
};

export default createStore