import * as React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Car, NewCar } from './models/car';
import { CarForm } from './components/CarForm';

const APP_QUERY = gql`
  query AppQuery {
    headerText
    colors {
      id
      name
    }
    cars {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const APPEND_CAR_MUTATION = gql`
  mutation AppendCar($car: AppendCar) {
    appendCar(car: $car) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const DELETE_CAR_MUTATION = gql`
  mutation DeleteCar($carId: ID) {
    deleteCar(carId: $carId) {
      id
    }
  }
`;

type Color = { id: number; name: string };

export type AppQueryData = {
  headerText: string;
  colors: Color[];
  cars: Car[];
};

export const App = () => {
  const { loading, data, error } = useQuery<AppQueryData>(APP_QUERY);

  const [mutateAppendedCar] = useMutation(APPEND_CAR_MUTATION);
  const [deleteCarMutation] = useMutation(DELETE_CAR_MUTATION);

  const appendCar = (car: NewCar) => {
    mutateAppendedCar({
      variables: { car },
      // refetchQueries: [{ query: APP_QUERY }],
      optimisticResponse: {
        appendCar: {
          ...car,
          id: -1,
          __typename: 'Car',
        },
      },
      update: (store, mutationResult) => {
        const data = store.readQuery<{ cars: Car[] }>({ query: APP_QUERY });
        data!.cars = data!.cars.concat(mutationResult?.data?.appendCar);
        store.writeQuery({ query: APP_QUERY, data });
      },
    });
  };

  const deleteCar = (carId: number) => {
    deleteCarMutation({
      variables: { carId },
      refetchQueries: [{ query: APP_QUERY }],
    });
  };

  if (loading) {
    return <div>Loading!</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>{data!.headerText}</h1>
      <ul>
        {data?.colors.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.cars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{car.price}</td>
              <td>
                <button onClick={() => deleteCar(car.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CarForm buttonText="Add Car" onSubmitCar={appendCar} />
    </>
  );
};
