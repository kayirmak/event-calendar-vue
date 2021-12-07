<template>
    <div>
        <h1>
            ID: {{this.$route.params.id}}

        </h1>
        <b-list-group>
            <b-list-group-item>Свадьба</b-list-group-item>
            <b-list-group-item>День рождение</b-list-group-item>
            <b-list-group-item>Корпоратив</b-list-group-item>
            <b-list-group-item>Новый год</b-list-group-item>
            <b-list-group-item>День зайца</b-list-group-item>
        </b-list-group>

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