// import React, { ReactNode } from 'react';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import {
  IconButton, Box, Flex, Button,
  useColorModeValue, HStack, useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, BellIcon } from '@chakra-ui/icons';
import SearchBar from './search-bar';
import { signoutUser } from '../../actions';
import { useAuthenticated, useSearchResultsPreview } from '../../hooks/redux-hooks';
import NavProfileMenu from './nav-profile-menu';

function NavBar({ onOpen, setAccountStatus, username }) {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const authenticated = useAuthenticated();
  const resultsPreview = useSearchResultsPreview();

  // button functions
  const signOut = () => {
    dispatch(signoutUser(navigate));
  };

  const handleSignUp = useCallback(() => {
    onOpen();
    setAccountStatus(false);
  }, [onOpen, setAccountStatus]);

  const handleLogIn = useCallback(() => {
    onOpen();
    setAccountStatus(true);
  }, [onOpen, setAccountStatus]);

  const handleBrowseGames = useCallback(() => {
    navigate('/browse');
  }, [navigate]);

  const handleYourProfile = useCallback(() => {
    navigate(`/${username}`);
  }, [navigate, username]);

  const handleSettings = useCallback(() => {
    navigate(`/${username}/settings`);
  }, [navigate, username]);

  const handleHomeButton = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // if signed in, render a different menu
  function renderMenu() {
    if (authenticated) {
      return (
        <HStack variant="navButtonRow">
          <Flex alignItems="center">
            <HStack spacing={3}>
              <IconButton
                aria-label="View notifications"
                colorScheme="gray"
                icon={<BellIcon />}
                size="lg"
                variant="ghost"
              />
            </HStack>
          </Flex>
          <NavProfileMenu handleBrowseGames={handleBrowseGames} handleSettings={handleSettings} handleYourProfile={handleYourProfile} signOut={signOut} username={username} />
        </HStack>
      );
    } else {
      return (
        <HStack variant="navButtonRow">
          <Button variant="ghostBW" onClick={handleBrowseGames}>
            BROWSE GAMES
          </Button>
          <Button variant="ghostBW" onClick={handleLogIn}>
            LOG IN
          </Button>
          <Button variant="solidPink" onClick={handleSignUp}>
            SIGN UP
          </Button>
        </HStack>
      );
    }
  }

  // render a search bar when not on the home page
  function renderSearchBar() {
    if (location === '/') {
      return null;
    } else {
      return (
        <SearchBar gamesData={resultsPreview} />
      );
    }
  }

  return (
    <div className="home-nav-bar">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex alignItems="center" h={16} justifyContent="space-between">
          <Flex justifyContent="flex-start" width="100%">
            <Button cursor="pointer" onClick={handleHomeButton}>insert logo here</Button>
          </Flex>
          <Flex alignItems="center" justifyContent="center" width="100%">
            {renderSearchBar()}
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" width="100%">
            <HStack spacing={3}>
              <Button id="light-dark-mode-button" variant="ghostBW" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {renderMenu()}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
