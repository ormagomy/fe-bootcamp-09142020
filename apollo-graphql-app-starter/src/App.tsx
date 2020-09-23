import * as React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Car } from './models/car';

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

type Color = { id: number; name: string };

export type AppQueryData = {
  headerText: string;
  colors: Color[];
  cars: Car[];
};

export const App = () => {
  const { loading, data, error } = useQuery<AppQueryData>(APP_QUERY);

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
            <tr>
              <td>{car.id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
