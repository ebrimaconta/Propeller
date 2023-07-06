import React, { useState, useEffect } from 'react';
import { getMarvelCharacters } from './lib/apiCalls';
import './App.css';
import Header from './components/header';
import Character from './components/character';
import Pagination from './components/pagination';

import Loading from './components/loading';

const App = () => {
  const [state, setState] = useState({
    loading: false,
    characters: [],
    page: 0,
    maxPage: 0,
    limitPerPage: 20,
  });
  useEffect(() => {
    const getCharacters = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { page, limitPerPage } = state;
      const limit = limitPerPage;
      const offset = page ? (page - 1) * limit : 0;
      try {
        const { characters, maxPage } = await getMarvelCharacters({ offset, limit });
        setState((prevState) => ({
          ...prevState,
          characters,
          page: characters.length ? page : 0,
          maxPage,
          loading: false,
        }));
      } catch (error) {
        console.error(error);
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };
    getCharacters();
  }, [state.page]);
  console.log('state', state);
  const changePage = (page) => {
    if (page !== state.page) {
      setState((prevState) => ({ ...prevState, page }));
    }
  };

  const { page, maxPage } = state;
  return (
    <div className='App'>
      <Header />
      <nav className='navbar App-navbar'>
        <ul className='nav navbar-nav'>
          <li className='active'>
            <a href='/'>
              <span className='h4'>Characters</span>
            </a>
          </li>
        </ul>
      </nav>

      {!state.loading && (
        <div className='App-characters'>
          {state.characters.map((c) => (
            <Character key={c.id} instance={c} />
          ))}
        </div>
      )}
      {state.loading && <Loading />}
      <Pagination page={page} maxPage={maxPage} changePage={changePage} />
    </div>
  );
};

export default App;
