<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="success">
    <b-navbar-brand :to="{name: 'EventsList'}">
      EVENTS ONLINE
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isAuth">
        <b-nav-item active :to="{name: 'EventsList'}">
              Список мероприятий
        </b-nav-item>
        <b-nav-item active :to="{name: 'CreateEvent'}">
              Создать мероприятие
        </b-nav-item>
        <b-nav-item active :to="{name: 'locations'}">
              Локации
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else>
        <b-nav-item active :to="{name: 'Login'}">
            Sign In
        </b-nav-item>
        <b-nav-item active :to="{name: 'Register'}">
            Sign Up
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="isAuth">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <b-icon icon="person-circle"></b-icon>
            <!-- <em>User</em> -->
          </template>
           <b-dropdown-item>
                    Профиль
            </b-dropdown-item>
            <b-dropdown-item @click="logoutBtn">
                    Выйти
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    name: 'Header',
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters({
        isAuth: 'isAuth'
      })
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
          this.$store.dispatch('clearEventStore', null)
          this.$router.push({name: 'Login'})
        })
      }
    }
}
</script>

<style scoped>
  a {
    color: #fff;
  }
  a:hover {
    color: rgb(228, 228, 228);
    text-decoration: none;
  }
</style>