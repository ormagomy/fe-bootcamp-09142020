import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    headerText: () => 'The Tools',
    colors: (_1, _2, { restURL }) => {
      return fetch(`${restURL}/colors`).then(res => res.json());
    },

    cars: (_1, _2, { restURL }) => {
      return fetch(`${restURL}/cars`).then(res => res.json());
    },
  },
};
