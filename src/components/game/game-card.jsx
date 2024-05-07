import React, { useCallback, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  Heading, Button, Text, Image, Stack, ButtonGroup,
  Card, CardBody, CardFooter,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { clearSelectedGame } from '../../actions';
import { useAuthenticated, useSelectedGame, useUserInfo } from '../../hooks/redux-hooks';
import { saveGame } from '../../api/gamedex';

function GameCard({ openAuthModal, isOpenAuthModal }) {
  // state
  const [userRating, setUserRating] = useState(0);

  // hooks
  const dispatch = useDispatch();
  const authenticated = useAuthenticated(); // to check if user is signed in
  const game = useSelectedGame(); // to grab data from selected game
  const userInfo = useUserInfo();

  // store the user data
  const username = userInfo?.username;

  // store the game data
  const title = game?.name; // game title
  const avgRating = game?.rating?.toFixed(2); // avg rating rounded to two decimals

  // Chakra modal setup
  const finalRef = React.useRef(null);

  const onCloseGame = useCallback(() => {
    setUserRating(0);
    dispatch(clearSelectedGame());
  }, [dispatch]);

  const onLogGame = useCallback(() => {
    // store the game model
    const savedGame = {
      id: game?.id,
      title: game?.name,
      coverUrl: game?.coverUrl,
      summary: game?.summary,
      releaseYear: game?.year,
      avgRating,

    };

    if (!authenticated) { // if not logged in
      openAuthModal();
    } else if (userRating === 0) { // if no rating is made
      saveGame(username, savedGame); // store the game w/o a rating
      onCloseGame();
    } else {
      // save the game with all data
      saveGame(username, savedGame, userRating);
      onCloseGame();
    }
  }, [game?.id, game?.name, game?.coverUrl, game?.summary, game?.year, avgRating, authenticated, userRating, openAuthModal, username, onCloseGame]);

  if (!game) {
    return null;
  }

  return (
    <div>
      <Modal blockScrollOnMount={false}
        finalFocusRef={finalRef}
        isCentered
        isOpen
        scrollBehavior="inside"
        onClose={onCloseGame}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding="0px">
            <Card
              alignItems="center"
              display={isOpenAuthModal ? 'none' : 'flex'}
              flexDirection="column"
              justifyContent="center"
            >
              <ModalCloseButton />
              <Heading
                marginTop="10px"
                size="md"
                textAlign="center"
                width="80%"
              >
                {title}
              </Heading>
              <Text
                fontSize="12px"
                fontWeight={700}
                mt="10px"
                textAlign="center"
              >
                {game.year}
              </Text>
              <CardBody
                alignItems="center"
                display="flex"
                flexDir="column"
                paddingBottom="0px"
              >
                <Image
                  alt="Game cover"
                  borderRadius="lg"
                  maxH="280px"
                  src={game.coverUrl}
                />
                <Text
                  fontSize="12px"
                  fontWeight={700}
                  mt="5px"
                  textAlign="center"
                >
                  AVG RATING: {avgRating}
                </Text>
                <Stack mt="6" spacing="3">
                  <Text
                    fontSize="13px"
                    ml="15px"
                    mr="15px"
                    textAlign="center"
                  >
                    {game.summary}
                  </Text>
                  <Text
                    fontSize="12px"
                    fontWeight={700}
                    mt="5px"
                    textAlign="center"
                  >
                    MY RATING: {userRating}
                  </Text>
                  <Slider
                    aria-label="Your game rating"
                    colorScheme="green"
                    defaultValue={0}
                    onChange={(val) => setUserRating(val)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    variant="greenAdd"
                    onClick={onLogGame}
                  >
                    ADD
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GameCard;