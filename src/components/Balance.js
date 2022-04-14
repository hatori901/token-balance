import React,{useState,useEffect} from "react";
import { useMoralis, useERC20Balances } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatter";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    TableContainer,
    Checkbox,
} from '@chakra-ui/react'

function Balance(props){
    const { Moralis,isAuthenticated } = useMoralis();
    const { fetchERC20Balances } = useERC20Balances();

    const [tokenList,setTokenList] = useState()
    useEffect(()=>{
        if(!isAuthenticated) return null;
        fetchERC20Balances({params: {chain: props.chain}}).then((tokens) => setTokenList(tokens))
    },[fetchERC20Balances,isAuthenticated])
    return (
        <div>
            <TableContainer marginBlock="20px">
            <Table variant='simple'>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>{props.chain}</Th>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th isNumeric>Balance</Th>
                <Th>Address</Th>
              </Tr>
            </Thead>
            <Tbody>
             {!tokenList 
             ? null
            : (Object.keys(tokenList).map((token,index) =>(
                <Tr key={index}>
                    <Td><Checkbox colorScheme='green'/></Td>
                    <Td><Image boxSize='30px' rounded="full" objectFit='cover' src={tokenList[token].logo || "https://etherscan.io/images/main/empty-token.png"}/></Td>
                    <Td>{tokenList[token].name}</Td>
                    <Td>{tokenList[token].symbol}</Td>
                    <Td isNumeric>{Moralis.Units.FromWei(tokenList[token].balance,tokenList[token].decimals)}</Td>
                    <Td>{getEllipsisTxt(tokenList[token].token_address,4)}</Td>
                </Tr>
            )))}
            </Tbody>
          </Table>
          </TableContainer>
        </div>
    )
}

export default Balance;