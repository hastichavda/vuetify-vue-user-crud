<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <div class="flex items-center justify-between">
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
        <div class="text-gray-400 mr-4 flex items-center justify-end">
          <MapIcon class="text-gray-600 mr-2 h-5 w-5" /> Dashboard
        </div>
      </div>
    </v-card>

    <div class="p-6">
      <v-card>
        <div class="flex justify-between items-center">
          <v-card-subtitle class="text-gray-500 text-xl font-medium">
            Users
          </v-card-subtitle>

          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" class="mr-4" dark v-bind="attrs" v-on="on">
                Create User
              </v-btn>
            </template>
            <v-card>
              <form action="" @submit.prevent="addUserData">
                <v-card-title>
                  <span class="text-h5">Create User</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.id"
                          :error-messages="idErrors"
                          label="Id"
                          required
                          outlined
                          dense
                          @input="$v.formData.id.$touch()"
                          @blur="$v.formData.id.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.name"
                          :error-messages="nameErrors"
                          label="Name"
                          required
                          outlined
                          dense
                          @input="$v.formData.name.$touch()"
                          @blur="$v.formData.name.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.surname"
                          :error-messages="surnameErrors"
                          label="Surname"
                          required
                          outlined
                          dense
                          @input="$v.formData.surname.$touch()"
                          @blur="$v.formData.surname.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.email"
                          :error-messages="emailErrors"
                          label="E-mail"
                          required
                          outlined
                          dense
                          @input="$v.formData.email.$touch()"
                          @blur="$v.formData.email.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.phone"
                          :error-messages="phoneErrors"
                          label="Phone Number"
                          required
                          outlined
                          dense
                          @input="$v.formData.phone.$touch()"
                          @blur="$v.formData.phone.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="formData.activate"
                          label="Do want you activate this user?"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" type="submit"> Save </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
        </div>
        <v-divider />
        <div class="p-4">
          <div class="grid gap-5 grid-cols-12">
            <v-text-field
              outlined
              label="Text"
              dense
              class="col-span-2"
              hint="Search by name, surname, email, username, company or phone
                number."
              persistent-hint
            >
            </v-text-field>
            <v-select
              :items="status"
              outlined
              dense
              label="Select status"
              class="col-span-2"
            ></v-select>
          </div>
        </div>
        <div
          class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 p-4"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="border-y border-gray-400">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6 lg:pl-8"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                >
                  Surname
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                >
                  Activate
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-gray-200">
              <tr
                v-for="(user, index) in getAllUsers"
                :key="index"
                :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                >
                  {{ user.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ user.surname }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ user.phone }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ user.activate }}
                </td>
                <td
                  class="relative flex space-x-2 items-center whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                >
                  <router-link
                    :to="`/users/edit/${user.id}`"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon @click="editUser(user)" />
                  </router-link>

                  <span class="hover:text-red-900 text-red-500">
                    <TrashIcon @click="removeUser(user.id)" />
                  </span>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr
                v-if="!getAllUsers.length"
                class="bg-gray-200 max-w-full h-20"
              >
                <td></td>
                <td></td>
                <td></td>
                <td class="flex items-center text-gray-600 mt-5 text-2xl">
                  No Items
                  <BanIcon class="text-red-500" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-show="deleteDialog"
          class="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full modal"
        >
          <div
            class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
          ></div>

          <div
            class="z-50 w-full p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container sm:max-w-lg lg:max-w-4xl"
            style="max-height: 80vh"
          >
            <div class="text-center text-gray-900 text-lg">
              <ExclamationIcon class="text-red-500 mx-auto h-10 w-10" />
              Do you want to delete this user?
            </div>
            <div class="flex justify-end space-x-4 mt-5">
              <v-btn @click="deleteDialog = false">Close</v-btn>
              <v-btn @click="deleteSelectedUser">Confirm</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import {
  BanIcon,
  TrashIcon,
  PencilIcon,
  ExclamationIcon,
  MapIcon,
} from '@vue-hero-icons/outline'
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  components: {
    BanIcon,
    TrashIcon,
    PencilIcon,
    ExclamationIcon,
    MapIcon,
  },

  data: () => ({
    dialog: false,
    deleteDialog: false,
    deleteId: null,

    formData: {
      id: '',
      name: '',
      email: '',
      surname: '',
      phone: '',
      activate: false,
    },

    items: [
      {
        text: 'Home',
        disabled: false,
        to: '/dashboard',
      },
      {
        text: 'Users',
        disabled: true,
        to: '#',
      },
    ],

    status: ['Foo', 'Bar', 'Fizz', 'Buzz'],

    users: [],
  }),

  validations: {
    formData: {
      id: { required },
      name: { required },
      surname: { required },
      email: { required, email },
      phone: { required },
    },
  },

  computed: {
    ...mapGetters(['getAllUsers']),

    idErrors() {
      const errors = []
      if (!this.$v.formData.id.$dirty) return errors
      !this.$v.formData.id.required && errors.push('Id is required.')
      return errors
    },

    nameErrors() {
      const errors = []
      if (!this.$v.formData.name.$dirty) return errors
      !this.$v.formData.name.required && errors.push('Name is required.')
      return errors
    },

    surnameErrors() {
      const errors = []
      if (!this.$v.formData.surname.$dirty) return errors
      !this.$v.formData.surname.required && errors.push('Surname is required.')
      return errors
    },

    emailErrors() {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('E-mail is required')
      return errors
    },

    phoneErrors() {
      const errors = []
      if (!this.$v.formData.phone.$dirty) return errors
      !this.$v.formData.phone.required &&
        errors.push('Phone number is required')
      return errors
    },
  },

  mounted() {
    this.fetchAllUsers()
  },

  methods: {
    ...mapActions([
      'fetchAllUsers',
      'setSelectedUser',
      'deleteUser',
      'addUser',
    ]),

    addUserData() {
      this.$v.formData.$touch()
      this.addUser(this.formData)
      this.formData = {
        id: '',
        name: '',
        email: '',
        surname: '',
        phone: '',
        activate: false,
      }
      this.dialog = false
    },

    editUser(user) {
      this.setSelectedUser(user)
    },

    removeUser(id) {
      // alert('Do you want to delete this user ?')
      this.deleteId = id

      this.deleteDialog = true
    },

    deleteSelectedUser() {
      this.deleteUser(this.deleteId)
      this.deleteDialog = false
      this.deleteId = null
    },
  },
}
</script>
