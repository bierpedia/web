module.exports = {
  client: {
    includes: ["src/**/*.{js,jsx,ts,tsx,vue,gql}"],
    service: {
      name: "bierpediaApi",
      url: "http://localhost:5000/graphql"
    }
  }
};
