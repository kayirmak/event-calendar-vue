<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">EVENTS ONLINE</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
        <router-link :to="{name: 'EventsList'}">
            Список мероприятий
        </router-link>
        </b-nav-item>
        <b-nav-item>
        <router-link :to="{name: 'CreateEvent'}">
            Создать мероприятие
        </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <b-icon icon="person-circle"></b-icon>
            <!-- <em>User</em> -->
          </template>
            <b-dropdown-item href="#">
              Профиль
            </b-dropdown-item>
            <b-dropdown-item @click="logoutBtn" href="#">
                    Выйти
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'Header',
    data(){
      return {

      }
    },
    methods: {
      ...mapActions([
        'logoutUser'
      ]),
      ...mapMutations([
        'clearEventStore'
      ]),
      logoutBtn(){
        this.logoutUser()
        .then(() => {
          this.clearEventStore(null)
          this.$router.push({name: 'Login'})
        })
      }
    }
    
}
</script>

<style>

</style>