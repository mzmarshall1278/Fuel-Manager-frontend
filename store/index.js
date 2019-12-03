import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state :{
            user :{
                id :'jhjfhgdgdg hxfhhc',
                type : 'manager',
                token : '09yn87lgj688itgitds3yv4d6u5bi7fn6ogibfinrl6fu',
                branchId : '01'
            },
            litre :[
                {oil:'petrol', price: 143},
                {oil: 'desiel', price : 198},
                {oil : 'kerosine', price : 221}
            ],
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
            pumps: [
                {id : '01', number : 1, oil: 'petrol'},
                {id : '02', number : 2, oil: 'petrol'},
                {id : '03', number : 3, oil: 'kerosine'},
                {id : '04', number : 4, oil: 'desiel'},
            ],
            deliveries : [
                {driver: "", truckId:"", oil:"", date:"", time:"",}
            ]
        },
        mutations:{

        },
        actions:{

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
                return id =>  getters.getPumps.find(pump => pump.id === id);
            },
            //gets the price of a litre for a particular oil
            litreAt(state){
                return oil => state.litre.find(litre => litre.oil === oil)
            }
        }
    })
}

export default createStore