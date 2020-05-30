module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'http://localhost:4000',
    },
    // Files processed by the extension
    includes: ['**/*.vue', 'src/**/*.js'],
  },
}
