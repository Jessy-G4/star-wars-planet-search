import React from 'react';
import { screen } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Table from '../components/Table';
import userEvent from '@testing-library/user-event'
import App from '../App';



test('Se ao entrar na página aparece um input de pesquisa', () => {
    renderWithContext(<Table />);
  const elemento = screen.getByRole('textbox');
  expect(elemento).toBeInTheDocument();
  });
test('Se as informações dos planetas são exibidas assim que a API é carregada.', async () => {
  await renderWithContext(<App />);
  const PlanetaUm = await screen.findByText(/tato/i);
  await expect(PlanetaUm).toBeInTheDocument();
})  

test('Se ao digitar no input, os planetas digitados são exibidos', async () => {
  await renderWithContext(<App />);
  const PlanetaUm = await screen.findByText(/tato/i);
 await expect(PlanetaUm).toBeInTheDocument();
  const elemento = await screen.getByRole('textbox')
  userEvent.type(elemento, 'Tat')
  const tatoo = await screen.findByRole('cell', {
    name: /tatooine/i
  })
 await expect(tatoo).toBeInTheDocument();
  console.log(screen.logTestingPlaygroundURL());
  
  })