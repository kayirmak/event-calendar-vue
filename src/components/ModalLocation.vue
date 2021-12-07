<template>
    <div class="modal-location">
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            :title="modalTitle"
            @hidden="closeModal"
            
        >
            <slot></slot>
            <p class="errors">{{errors}}</p>
            
            <template slot="modal-footer">
                <b-button v-if="isLoadingBtn" disabled class="btn-submit" @click="btnMethod(id)" variant="success">
                    <b-spinner small type="grow"></b-spinner>
                    Загрузка...
                </b-button>

                <b-button v-else class="btn-submit" @click="btnMethod(id)" variant="success">
                    {{btnTitle}}
                </b-button>           
                
                <b-button class="close-modal" @click="closeModal">Отмена</b-button>
            </template>
        </b-modal> 
    </div>
</template>

<script>
export default {
    name: 'GModal',
    props: {
        modalTitle: {
            type: String,
        },
        btnTitle: {
            type: String,
            default: 'Отправить'
        },
        errors: {
            type: String
        },
        id: {
            type: Number
        },
        isLoadingBtn: {
            type: Boolean
        }
    },
    
    data() {
      return {
        title: '',
      }
    },
    methods: {
        btnMethod(id) {
            this.$emit('btnMethod', id)
        },
        closeModal() {
            this.$emit('closeModal')
        },
    }
}
</script>

<style scoped>
    .close-modal {
        cursor: pointer;
    }
    .errors {
        color: red
    }
</style>