<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="success">
    <b-navbar-brand href="#">EVENTS ONLINE</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isAuth">
        <b-nav-item>
        <router-link :to="{name: 'EventsList'}">
            Events List
        </router-link>
        </b-nav-item>
        <b-nav-item>
        <router-link :to="{name: 'CreateEvent'}">
            Create Event
        </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else>
        <b-nav-item>
        <router-link :to="{name: 'Login'}">
            Sign In
        </router-link>
        </b-nav-item>
        <b-nav-item>
        <router-link :to="{name: 'Register'}">
            Sign Up
        </router-link>
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
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item>
                <router-link :to="{name: 'Login'}">
                    Sign Out
                </router-link>
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Header',
    computed: {
      ...mapGetters({
        isAuth: 'isAuth'
      })
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