import fetch from 'node-fetch';
import { GraphQLScalarType, Kind } from 'graphql';

const hexCodePattern = RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
const hexCodeType = new GraphQLScalarType({
  name: 'HexCode',
  description: 'A 6-digit hexidecimal value',
  serialize(value) {
    if (typeof value === 'string' && hexCodePattern.test(value)) {
      return value;
    }
    throw new Error(`Invalid hexcode: ${value}`);
  },
  parseValue(value) {
    if (typeof value === 'string' && hexCodePattern.test(value)) {
      return value;
    }
    throw new Error(`Invalid hexcode: ${value}`);
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.String:
        return 'string';
    }
  },
});

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    headerText: () => 'The Tools',

    colors: (_1, _2, { restURL }) => {
      return fetch(`${restURL}/colors`).then(res => res.json());
    },

    color: (_, args, { restURL }) => {
      return fetch(`${restURL}/colors/${encodeURIComponent(args.colorId)}`).then(res => res.json());
    },

    cars: (_1, _2, { restURL }) => {
      return fetch(`${restURL}/cars`).then(res => res.json());
    },

    car: (_, { carId }, { restURL }) => {
      return fetch(`${restURL}/cars/${encodeURIComponent(carId)}`).then(res => res.json());
    },
  },
  HexCode: hexCodeType,
};

