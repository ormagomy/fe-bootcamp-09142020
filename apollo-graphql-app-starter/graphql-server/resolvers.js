import fetch from 'node-fetch';
import { GraphQLScalarType } from 'graphql';

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
      case 'StringValue':
        return ast.value;
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
  Mutation: {
    appendCar: async (_, { car }, { restURL }) => {
      const res = await fetch(`${restURL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      const { id } = await res.json();
      const res2 = await fetch(`${restURL}/cars/${encodeURIComponent(id)}`);
      return res2.json();
    },

    deleteCar: async (_, { carId }, { restURL }) => {
      const car = await (await fetch(`${restURL}/cars/${encodeURIComponent(carId)}`)).json();
      await fetch(`${restURL}/cars/${carId}`, { method: 'DELETE' });
      return car;
    },

    appendColor: async (_, { color }, { restURL }) => {
      const res = await fetch(`${restURL}/colors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(color),
      });
      const { id } = await res.json();
      const res2 = await fetch(`${restURL}/colors/${encodeURIComponent(id)}`);
      return res2.json();
    },

    deleteColor: async (_, { colorId }, { restURL }) => {
      const color = await (await fetch(`${restURL}/colors/${encodeURIComponent(colorId)}`)).json();
      await fetch(`${restURL}/colors/${colorId}`, { method: 'DELETE' });
      return color;
    },
  },
  HexCode: hexCodeType,
};
