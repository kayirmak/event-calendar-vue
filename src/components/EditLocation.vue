<template>
    <div>
        <Modal 
            @closeModal="closeModal"
            @btnMethod="createLocation"
            btnTitle="red"
            modalTitle="Edit"
            :errors="errors"
        >
            <b-input v-model="title"></b-input>
        </Modal>
    </div>
</template>

<script>
import Modal from './ModalLocation.vue'

export default {
    components: {
        Modal
    }
}
</script>