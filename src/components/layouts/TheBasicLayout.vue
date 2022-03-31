<template>
  <div class="h-screen">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        app
        color="blue-grey darken-1"
      >
        <div class="p-4 text-white bg-gray-700" v-show="mini == false">
          <h1 class="text-lg font-medium text-center sm:text-2xl">
            Vue Practical
          </h1>
        </div>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
            style="color: #fff"
          >
            <v-list-item-icon>
              <v-icon style="color: #fff">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        <div class="hidden ml-6 md:block">
          <ul
            class="flex items-center space-x-10 text-base text-gray-500 cursor-pointer sm:text-lg"
          >
            <li class="hover:text-gray-900">
              <router-link to="/dashboard"> Dashboard </router-link>
            </li>
            <li class="hover:text-gray-900">
              <router-link to="/users">Users</router-link>
            </li>
          </ul>
        </div>

        <!-- Resources and Tools -->
        <div
          class="flex items-center justify-end w-full space-x-4 md:space-x-7"
        >
          <!-- Notification bar -->
          <div class="relative">
            <BellIcon
              class="w-6 h-6 text-gray-400 cursor-pointer md:w-7 md:h-7 hover:text-gray-900"
            />
            <div
              class="absolute top-0 w-4 h-3 text-xs font-normal text-center text-white bg-red-400 md:w-5 md:h-4 -right-1 rounded-xl"
            >
              5
            </div>
          </div>

          <!-- List bar -->
          <div class="relative">
            <ListIcon
              class="w-4 h-4 text-gray-400 cursor-pointer md:w-6 md:h-6 hover:text-gray-900"
            />
            <div
              class="absolute top-0 w-4 h-3 text-xs font-normal text-center text-white bg-yellow-400 md:w-5 md:h-4 -right-1 rounded-xl"
            >
              5
            </div>
          </div>

          <!-- Messages -->
          <div class="relative">
            <EnvelopIcon
              class="w-4 h-4 text-gray-400 cursor-pointer md:w-6 md:h-6 hover:text-gray-900"
            />
            <div
              class="absolute top-0 w-4 h-3 text-xs font-normal text-center text-white bg-blue-400 md:w-5 md:h-4 -right-1 rounded-xl"
            >
              4
            </div>
          </div>

          <!-- Profile Setting -->
          <div>
            <img
              src="../../assets/avatar.jpeg"
              width="400"
              class="w-8 h-8 rounded-full shadow-lg cursor-pointer md:w-10 md:h-10"
              alt=""
            />
          </div>
        </div>
      </v-app-bar>

      <v-main class="bg-gray-200 h-screen">
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import { BellIcon } from '@vue-hero-icons/outline'
import EnvelopIcon from '../icons/EnvelopIcon.vue'
import ListIcon from '../icons/ListIcon.vue'

export default {
  components: { BellIcon, EnvelopIcon, ListIcon },

  data() {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: 'dashboard' },
        { title: 'Users', icon: 'mdi-account-group-outline', to: 'users' },
      ],
      mini: false,
    }
  },
}
</script>
