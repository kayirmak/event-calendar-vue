<template>
    <div class="profile" v-if="user">
        <Modal
            v-if="isVisibleLocation === 'CHANGE_PASSWORD'"
            @closeModal="closeModal"
            btnTitle="Изменить"
            modalTitle="Изменить пароль"
            :isLoadingBtn="isLoadingBtn"
            :errors="errors"
            @btnMethod="changePassword"
        >
            <b-form-group
                    label="Старый пароль"
                    label-for="old-password"
                >
                    <b-form-input
                        id="old-password"
                        v-model="oldPassword"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Новый пароль"
                    label-for="new-password"
                >
                    <b-form-input
                        id="new-password"
                        v-model="newPassword"
                        required
                    ></b-form-input>

                </b-form-group>
                <b-form-group
                    label="Подтвердите пароль"
                    label-for="confirm-password"
                >
                    <b-form-input
                        id="confirm-password"
                        v-model="confirmPassword"
                        required
                    ></b-form-input>
                </b-form-group>
                <span class="errors-change-password">{{errorsChangePassword}}</span>
        </Modal>

        <div class="profile-data">
            <div class="profile-data__link">
                <router-link :to="{name: 'EventsList'}">
                    Мои мероприятия
                    <b-badge variant="primary">{{user.activities.length > 99 ? '99+' : user.activities.length}}</b-badge>
                </router-link>
            </div>
            <div class="prodile-data__link">
                <router-link :to="{name: 'My-Locations'}">
                    Мои локации
                    <b-badge variant="primary">{{locationsByUser.length > 99 ? '99+' : locationsByUser.length}}</b-badge>
                </router-link>
            </div>
        </div>

        <div class="profile-details">
            <h3 class="profile-details__title">Персональные данные</h3>
            <div class="profile-details__data">
                <p class="data-name grey">Имя пользователя<span class="black">{{user.username}}</span></p> 
                <p class="data-email grey">Email<span class="black">{{user.email}}</span></p>
                <b-button 
                    v-b-modal.modal-prevent-closing
                    @click="showModal('CHANGE_PASSWORD')"
                >
                    Изменить пароль
                </b-button>
            </div>
        </div>

        


        <div class="profile-card">
            <div>
                <img src="" alt="">
            </div>
            <h4 class="profile-card__name">{{user.username}}</h4>
        </div>
    </div>
</template>

<script>
import Modal from '../components/ModalLocation.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Gprofile',
    components: {
        Modal
    },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isVisibleLocation: '',
            errors: ''
        }
    },
    updated() {
        if(this.oldPassword && this.newPassword && this.confirmPassword) this.errors = ''
    },
    computed: {
        ...mapGetters({
            user: 'USER',
            locationsByUser: 'locationsByUser',
            isLoadingBtn: 'isLoadingBtn',
            errorsChangePassword: 'errorsChangePassword'
        })
    },
    methods: {
        ...mapMutations({
            changePasswordClear: 'changePasswordClear'
        }),
        makeToast(variant = null, title, body) {
            this.$bvToast.toast(`${body} `, {
                title: `${title || 'default'}`,
                variant: variant,
                solid: true,
            })
        },
        showModal(key, id) {
            this.isVisibleModal = true
            this.isVisibleLocation = key
            this.id = id
        },
        closeModal() {
            this.isVisibleLocation = null
            this.errors = ''
            this.oldPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
            this.changePasswordClear()
        },
        changePassword() {
            if(!this.oldPassword || !this.newPassword || !this.confirmPassword) {
                this.errors = 'Заполните все поля'
                this.changePasswordClear()
                return 
            }
            console.log(this.oldPassword, this.newPassword, this.confirmPassword);
            this.$store.dispatch('changePassword', {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            }).then(() => {
                this.closeModal()
                this.makeToast('success', 'Успешно', 'Пароль изменен')
            }).catch(error => {
                this.$store.commit("changePasswordFailure", error.message)  
                })
        }
        
    }

}
</script>

<style scoped>
a {
    color: #000;
}
a:hover {
    color: rgb(75, 75, 75);
    text-decoration: none;
}
.profile{
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-top: 10px;
}
.profile-card {
    width: 20%;
    padding: 90px 0;
    box-shadow: 1px 1px 4px rgb(216, 216, 216);
}
.profile-details {
    padding: 20px;
    width: 60%;
    box-shadow: 1px 1px 4px rgb(216, 216, 216);
    text-align: left;
}
.profile-details__data {
    margin: 30px 0 0 120px;
}
.profile-data {
    padding: 20px;
    width: 15%;
    box-shadow: 1px 1px 4px rgb(216, 216, 216);
    text-align: left;
}
.profile-data__link {
    margin-bottom: 7px;
}
.grey {
    color: rgb(160, 160, 160);
}
.black {
    color: #000;
    margin-left: 10px;
}
.errors-change-password {
    font-weight: 600;
    color: red
}
</style>