import React from 'react';
import { useMoralis } from "react-moralis";
import {
  ChakraProvider,
  Box,
  theme,
  Container,
  Button,
  Flex,
  Image,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text
} from '@chakra-ui/react';
import Balance from './components/Balance';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const {authenticate, isAuthenticated, isAuthenticating, logout } = useMoralis();
  const {isOpen,onOpen,onClose} = useDisclosure();

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
            <>
              <Button colorScheme="blue" onClick={onOpen}>{isAuthenticating ? "Loading..." : "Connect Wallet"}</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay/>
                  <ModalContent>
                    <ModalHeader>
                      Connect Wallet
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                      <Button m="5px" size='lg' onClick={() => login("metamask")}>
                        <Flex alignItems="center">
                          <Image w="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"></Image>
                          <Text>Metamask</Text>
                        </Flex>
                      </Button>
                      <Button m="5px" size='lg' onClick={() => login("walletconnect")}>
                        <Flex alignItems="center">
                          <Image w="30px" src="https://repository-images.githubusercontent.com/204001588/a5169900-c66c-11e9-8592-33c7334dfd6d"></Image>
                          <Text>Wallet Connect</Text>
                        </Flex>
                      </Button>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
              </Modal>
              </>
            
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
