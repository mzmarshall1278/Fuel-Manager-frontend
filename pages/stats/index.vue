<template>
    <div class="container">
        <PageTitle pageTitle = "Stats" class="pa-2"></PageTitle>

        <litreCard class="mb-5"/>

        <!-- <reservoirCard class="mb-4" /> -->


    </div>
</template>
<script>
import litreCard from "~/components/cards/LitreCard";   
import reservoirCard from "~/components/cards/ReservoirCard";
export default {
    components : {litreCard, reservoirCard}
}
</script>
