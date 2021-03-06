import React from 'react';
import 'jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library';

import MoviesList from './MoviesList';
import MovieType from './MovieType';

const movies: MovieType[] = [
  {
    id: 1,
    title: 'A movie',
    image: '/img/a-movie.png',
    overview: 'The movie',
    genres: ['genre one']
  },
  {
    id: 2,
    title: 'Another movie',
    image: '/img/another-movie.png',
    overview: 'That other movie',
    genres: ['genre two', 'genre three']
  }
];

describe('The MoviesList', () => {
  let setSelected: jest.Mock;

  beforeEach(() => {
    setSelected = jest.fn();
  });

  afterEach(cleanup);

  test('can render with empty list', () => {
    render(
      <MoviesList movies={[]} selected={null} setSelected={setSelected} />
    );
  });

  test('can render with two movies', () => {
    const { getByText } = render(
      <MoviesList movies={movies} selected={null} setSelected={setSelected} />
    );

    expect(getByText('A movie')).toBeInTheDocument();
    expect(getByText('The movie')).toBeInTheDocument();
    expect(getByText('Another movie')).toBeInTheDocument();
    expect(getByText('That other movie')).toBeInTheDocument();
  });

  test("doesn't render a genre if the movie isn't selected", () => {
    const { queryByText } = render(
      <MoviesList movies={movies} selected={null} setSelected={setSelected} />
    );

    expect(queryByText('genre one')).not.toBeInTheDocument();
  });

  test('renders the genre when the movie is selected', async () => {
    const { getByText } = render(
      <MoviesList
        movies={movies}
        selected={movies[0]}
        setSelected={setSelected}
      />
    );

    await waitForElement(() => getByText('genre one'));

    expect(getByText('genre one')).toBeInTheDocument();
  });

  test('selects a movie when the card header is clicked', () => {
    const { getByText } = render(
      <MoviesList movies={movies} selected={null} setSelected={setSelected} />
    );

    fireEvent.click(getByText('A movie'));

    expect(setSelected).toHaveBeenCalledTimes(1);
  });
});
