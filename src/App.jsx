import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    try {
      const res = await fetchDataFromApi('/configuration');
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };

      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.error('Failed to fetch API configuration:', error);
    }
  };

  const genresCall = async () => {
    try {
      let promises = [];
      let endPoints = ['tv', 'movie'];
      let allGenres = {};

      endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      console.log(data);
      data.forEach(({ genres }) => {
        genres.forEach((item) => {
          allGenres[item.id] = item;
        });
      });

      dispatch(getGenres(allGenres));
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
