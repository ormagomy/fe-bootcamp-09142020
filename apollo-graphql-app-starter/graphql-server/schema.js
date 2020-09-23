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

  type Mutation {
    appendCar(car: AppendCar): Car
    deleteCar(carId: ID): Car
    appendColor(color: AppendColor): Color
    deleteColor(colorId: ID): Color
  }

  input AppendColor {
    name: String
    hexcode: HexCode
  }

  input AppendCar {
    make: String
    model: String
    year: Int
    color: String
    price: Float
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
