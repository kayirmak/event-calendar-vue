<template>
    <ul class="pagination">
        <li v-for="page of pages" :key="page">
            <router-link
                :to="{query: {page: page}}"
            >
                {{page}}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Gpagination',
    data() {
        return {
            url: '/page'
        }
    },
    props: {
        limit: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
        locations: {
            type: Array
        }
        
    },
    computed: {
        paginatedData() {
            
        },
        pages() {
            const pagesCount = Math.ceil(this.total / this.limit)
            console.log([...Array(pagesCount).keys()].map(el => el + 1));
            return [...Array(pagesCount).keys()].map(el => el + 1)
        }
    }
}
</script>