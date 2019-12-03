<template>
    <div class="title">
        <h3 class="text-center headline">{{pageTitle}}</h3>
    </div>
</template>
<script>
export default {
    props:  {
        pageTitle : String
    }
}
</script>
<style>
.title{
    color: #006064;
}
</style>
