<template>
    <div>
        <h1>
            ID: {{this.$route.params.id}}
        </h1>
    </div>
</template>

<script>
export default {
    name: "GcardLocation",
    props: {
       
    },
    mounted() {
        console.log(this.$route.params);
    }
}
</script>