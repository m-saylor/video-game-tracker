import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import NavBar from './nav-bar';
import Game from './game';
import Games from './games';
import NewGame from './new-game';
import RequireAuth from './require-auth';
import SearchBar from './search-bar';
import Results from './results';
import AuthModal from './auth-modal';

export default function App(props) {
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div>
          <NavBar onOpen={onOpen} />
          <SearchBar search={search} setSearch={setSearch} />
          <AuthModal isOpen={isOpen} onClose={onClose} />
          <Routes>
            <Route element={<Games />} path="/" />
            <Route element={<RequireAuth> <NewGame /> </RequireAuth>} path="/games/new" />
            <Route element={<Game />} path="/games/:gameID" />
            <Route element={<Results />} path="/results" />
            <Route element={<FallBack />} path="*" />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}
