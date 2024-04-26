import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, // Button,
  IconButton, Progress,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';

function BrowseGames(props) {
  // fetch the top rated games
  const topRatedGames = useSelector((reduxState) => reduxState.search?.topRatedGames);
  const topRatedCovers = useSelector((reduxState) => reduxState.search?.topRatedCovers);

  // determine if the game is in your library
  const gameInLibrary = useSelector((reduxState) => reduxState.posts?.id);

  // determine variant for top rated game cards to alternate colors
  function determineCardColor(index) {
    if (index % 2 === 0) {
      return 'outline';
    } else {
      return 'filled';
    }
  }

  // render an add button if game is not added to library, else checkmark
  function renderAddButton() {
    // check if game is in your logged games library
    if (gameInLibrary) {
      return (
        <IconButton
          aria-label="Game is in your library"
          icon={<CheckCircleIcon />}
          variant="unstyled"
        />
      );
    } else {
      return (
        <IconButton
          aria-label="Add game to your games"
          icon={<AddIcon />}
          variant="solid"
        />
      );
    }
  }

  // render the top rated games as horizontal cards
  function renderTopRatedGames() {
    const renderedGames = topRatedGames?.map((game, index) => {
      const coverUrl = `https:${topRatedCovers.get(game.cover)}`.replace('thumb', 'cover_big');
      console.log(coverUrl);
      // console.log(game.screenshots);
      return (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          key={game.id}
          ml={40}
          mr={40}
          overflow="hidden"
          variant={determineCardColor(index)}
        >
          <CardHeader>
            <Heading
              alignItems="center"
              className="number-rankings"
              color="#cccccc"
              colorScheme="lightgray"
              display="flex"
              fontSize={56}
              fontWeight={700}
              height="100%"
              justifyContent="center"
              size="lg"
              textAlign="center"
              width={20}
            >
              {index + 1}
            </Heading>
          </CardHeader>

          <Image
            alignItems="center"
            alt="game cover photo"
            borderRadius={6}
            borderStyle="solid"
            borderWidth={3}
            maxH="165px"
            mb={5}
            mr={5}
            mt={5}
            objectFit="cover"
            src={coverUrl}
          />

          <Stack>
            <CardBody>
              <Heading
                fontSize={24}
                size="md"
              >
                {game.name}
              </Heading>

              <Text fontSize={16} py="2">
                {Math.round(game.rating)}
              </Text>

              <Progress colorScheme="green" value={game.rating} />
            </CardBody>

            <CardFooter>
              {renderAddButton()}
            </CardFooter>
          </Stack>
        </Card>
      );
    });

    return renderedGames;
  }

  return (
    <Tabs colorScheme="gray" variant="soft-rounded">
      <TabList display="flex" justifyContent="center" margin={10}>
        <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TRENDING</Tab>
        <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TOP RATED</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>insert trending here</TabPanel>
        <TabPanel>
          {renderTopRatedGames()}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default BrowseGames;
