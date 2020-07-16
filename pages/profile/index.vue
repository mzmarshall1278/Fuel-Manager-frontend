<template>
    <div class="container">
        <PageTitle pageTitle = "Profile"></PageTitle>
    </div>
</template>
<script>
export default {
     middleware:[
    'checkAuth',
    'Auth'],
}
</script>
