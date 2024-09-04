export const environment = {
  production: false,

  api: {
    baseUrl: 'https://simon-api.avterp.com/api',

    formSettings: {
      add: '/form-settings',
      get: '/form-settings',
      delete: '/form-settings',
      update: '/form-settings', // Assuming your update endpoint is similar
    },
    leadsMaster: {
      add: '/leads-master',
      get: '/leads-master',
      delete: '/leads-master',
      update: '/leads-master',
      clone: '/leads-master/clone',
      updateOwner: '/leads-master/change-owner',
    },
    opportunitiesMaster: {
      add: '/opportunities-master',
      get: '/opportunities-master',
      delete: '/opportunities-master',
      update: '/opportunities-master',
      clone: '/opportunities-master/clone',
    },
    users: {
      getOwners: '/users', // Endpoint to get list of owners
    },
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      getUserInfo: '/auth/user-info',
    },
  },
};
