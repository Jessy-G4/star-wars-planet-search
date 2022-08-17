import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planetasInfo, requisitandoPlanetas } = useContext(StarContext);
  useEffect(() => { requisitandoPlanetas(); }, []);
  const planetas = planetasInfo.filter((get) => delete get.residents);
  return (
    <table>
      <tr>
        <th>name</th>
        <th>rotation period</th>
        <th>orbital period</th>
        <th>diamter</th>
        <th>climate</th>
        <th>gravity</th>
        <th>terrain</th>
        <th>surface water</th>
        <th>population</th>
        <th>films</th>
        <th>created</th>
        <th>edited</th>
        <th>URL</th>
      </tr>
      {
        planetas.map((get) => (
          <tr key={ get.name }>
            <td>{get.name}</td>
            <td>{get.rotation_period}</td>
            <td>{get.orbital_period}</td>
            <td>{get.diameter}</td>
            <td>{get.climate}</td>
            <td>{get.gravity}</td>
            <td>{get.terrain}</td>
            <td>{get.surface_water}</td>
            <td>{get.population}</td>
            <td>{get.films}</td>
            <td>{get.created}</td>
            <td>{get.edited}</td>
            <td>{get.url}</td>
          </tr>
        ))
      }
    </table>
  );
}

export default Table;
