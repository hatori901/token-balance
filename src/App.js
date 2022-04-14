import React from 'react';
import { useMoralis } from "react-moralis";
import {
  ChakraProvider,
  Box,
  theme,
  Container,
  Button,
  Flex,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import Balance from './components/Balance';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const {authenticate, isAuthenticated, isAuthenticating, logout } = useMoralis();


  const login = async (wallet) => {
      
    if (!isAuthenticated) {
      
      await authenticate({
        signingMessage: "Log in using Web3",
        provider: wallet,
      })
        .then(function (user) {
          localStorage.setItem('address',user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  const logOut = async () => {
    await logout();
    localStorage.removeItem('address');
  }
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Container maxW="container.xl" shadow="xl" rounded="md" marginBlock="20px" padding="10px">
        <Flex justifyContent="space-between">
          <ColorModeSwitcher justifySelf="flex-start" />
          {!isAuthenticated
          ? (
            <Button colorScheme="blue" onClick={() => login("metamask")}>{isAuthenticating ? "Loading..." : "Connect Wallet"}</Button>
          ): (
            <Button colorScheme="red" onClick={logOut}>Disconnect</Button>
          )}
        </Flex>
        <div style={{marginBlock: "20px"}}>
        {isAuthenticated && (
            <>
            <Tabs isFitted  variant='enclosed'>
              <TabList>
                <Tab fontWeight="bold">ETH</Tab>
                <Tab fontWeight="bold">BSC</Tab>
                <Tab fontWeight="bold">POLYGON</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                <Balance chain="eth"/>
                </TabPanel>
                <TabPanel>
                <Balance chain="bsc"/>
                </TabPanel>
                <TabPanel>
                <Balance chain="polygon"/>
                </TabPanel>
              </TabPanels>
            </Tabs>
            </>   
          )}
        </div>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
