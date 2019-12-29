export default (context) => {
        //console.log(context.req)
        context.store.dispatch('initAuth', context.req)
}