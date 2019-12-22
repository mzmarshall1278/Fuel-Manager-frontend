
import axios from 'axios'
import Cookie from 'js-cookie'

export default{
        state :{
            user :{
                userId :'',
                type : 'manager',
                branchId : '5de125cb75366918af187637',
                stationId : '5dde52f5bd009d27b54d3fb2'
            },
            token : null,
            
        },
        mutations:{
            
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

            
        },
        getters : {
            
            isAuthenticated(state){
                return state.token != null
            }
        }
    }