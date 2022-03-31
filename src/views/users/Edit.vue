<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <div class="flex items-center justify-between">
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
      </div>
    </v-card>

    <div class="p-6">
      <v-card class="p-4">
        <form action="" @submit.prevent="submitData">
          <v-text-field
            v-model="formData.id"
            label="Id"
            required
            outlined
            dense
          ></v-text-field>

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

          <v-checkbox
            v-model="formData.activate"
            label="Do want you activate this user?"
          ></v-checkbox>

          <div class="flex justify-end">
            <v-btn class="mr-4" color="primary" type="submit"> submit </v-btn>
          </div>
        </form>
      </v-card>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [validationMixin],

  data: () => ({
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
        disabled: false,
        to: '/users',
      },
      {
        text: 'Edit',
        disabled: true,
        to: '#',
      },
    ],
  }),

  validations: {
    formData: {
      name: { required },
      surname: { required },
      email: { required, email },
      phone: { required },
    },
  },

  computed: {
    ...mapGetters(['getSelectedUser']),

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
    if (this.$route.params.id) {
      this.fetchUserData()
    }
  },

  methods: {
    ...mapActions(['addUser', 'updateUser', 'fetchSelectedUser']),

    fetchUserData() {
      this.fetchSelectedUser()
      if (this.getSelectedUser) {
        this.formData.id = this.getSelectedUser.id
        this.formData.name = this.getSelectedUser.name
        this.formData.surname = this.getSelectedUser.surname
        this.formData.email = this.getSelectedUser.email
        this.formData.phone = this.getSelectedUser.phone
        this.formData.activate = this.getSelectedUser.activate
      }
    },

    submitData() {
      this.$v.formData.$touch()

      if (this.$route.params.id) {
        this.updateUserData()
      }

      this.$router.push('/users')
    },

    addUserData() {
      this.addUser(this.formData)
      alert('User added successfully.')
    },

    updateUserData() {
      this.updateUser(this.formData)
      alert('User updated successfully.')
    },
  },
}
</script>
