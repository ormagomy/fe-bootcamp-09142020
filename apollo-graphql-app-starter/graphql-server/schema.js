export const typeDefs = `
  scalar HexCode

  type Query {
    message: String
    headerText: String
    colors: [Color]
    cars: [Car]
    color(colorId: ID): Color
    car(carId: ID): Car
  }

  type Color {
    id: ID
    name: String
    hexcode: HexCode
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
