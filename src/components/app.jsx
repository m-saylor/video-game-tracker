import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import NavBar from './nav-bar/nav-bar';
import BrowseGames from './browse-games/browse-games';
import RequireAuth from './require-auth';
import Results from './search-results/results';
import AuthModal from './auth-modal/auth-modal';
import GameCard from './game/game-card';
import {
  clearAuthError, fetchTopRatedGames, fetchTrendingGames, loadUser,
} from '../actions';
import theme from '../theme/theme';
import { useUserInfo } from '../hooks/redux-hooks';
import UserProfile from './user-profile/user-profile';
import Settings from './user-profile/settings/settings';
import * as Twitch from '../api/twitch';
import AuthToaster from './auth-toaster';
// import Footer from './footer';

function setDefaultDarkMode() {
  const userColorMode = localStorage.getItem('user-color-mode');
  if (!userColorMode || userColorMode === 'dark') {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  }
}

export default function App(props) {
  // state
  const [accountStatus, setAccountStatus] = useState(true); // true if the user has an account

  // hooks
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure(); // auth modal
  const user = useUserInfo();

  // store username
  const username = user?.username;

  const closeAuthModal = useCallback(() => {
    dispatch(clearAuthError());
    onClose();
  }, [dispatch, onClose]);

  // load user (check local storage for token)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // load top rated games
  useEffect(() => {
    dispatch(fetchTopRatedGames());
  }, [dispatch]);

  // get trending games on twitch
  useEffect(() => {
    async function getTrendingGames() {
      // Get access token if it isn't stored already
      let twitchToken = localStorage.getItem('twitchToken');
      if (!twitchToken) {
        twitchToken = await Twitch.getAccessToken();
        localStorage.setItem('twitchToken', twitchToken);
      }
      // Fetch trending games
      dispatch(fetchTrendingGames());
    }

    getTrendingGames();
  }, [dispatch]);

  return (
    <ChakraProvider theme={theme}>
      {setDefaultDarkMode()}
      <BrowserRouter>
        <div>
          <NavBar accountStatus={accountStatus} setAccountStatus={setAccountStatus} username={username} onOpen={onOpen} />
          <AuthModal accountStatus={accountStatus} isOpen={isOpen} setAccountStatus={setAccountStatus} onClose={closeAuthModal} />
          <GameCard isOpenAuthModal={isOpen} openAuthModal={onOpen} />
          <Routes>
            <Route element={<BrowseGames />} path="/" />
            {/* temporary home page as browse games page */}
            <Route element={<BrowseGames />} path="/browse" />
            {/* <Route element={<Game />} path="/games/:gameID" /> */}
            <Route element={<Results />} path="/results" />
            <Route element={<UserProfile user={user} username={username} />} path="/:username" />
            <Route element={<RequireAuth> <Settings user={user} username={username} /> </RequireAuth>} path="/:username/settings" />
            <Route element={<FallBack />} path="*" />
          </Routes>
          <AuthToaster onAuth={closeAuthModal} />
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}
