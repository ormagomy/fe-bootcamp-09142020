export const typeDefs = `
  type Query {
    message: String
    headerText: String
    colors: [Color]
    cars: [Car]
  }

  type Color {
    id: ID
    name: String
    hexcode: String
  }

  type Car {
    id: Int
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }
`;
