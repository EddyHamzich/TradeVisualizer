import React, { useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Box, Text, Flex } from "@chakra-ui/react";
import { TradeItem } from "./TradeItem";
import { useGiphy } from "../hooks/useGiphy";

export const TradesList = () => {

  const { gifs } = useGiphy(25, "money")
  const qtyFilter = 50000
  const messageHistory = useRef([])

  //eslint-disable-next-line
  const { _, readyState } = useWebSocket(
    "wss://fstream.binance.com/ws/btcusdt@aggTrade",
    {onMessage: (msg) => {
      if(msg) {
        let parsed = JSON.parse(msg.data)
        let dollarQty = +parsed.q * +parsed.p
        parsed.gif = gifs[Math.floor(Math.random() * 25)]
        if(dollarQty > qtyFilter) {
          messageHistory.current.unshift(parsed)
          // only keep last 50 trades in memory
          messageHistory.current = messageHistory.current.slice(0,50)
        }
      }
    }}
  )

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting...",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing...",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState]

  return (
    <Flex justifyContent="center">
      <Box w="500px">
        <Text color="white" p={2} textAlign="center">
          Connection: {connectionStatus} | Binance Futures BTCUSDT
        </Text>
        <ul>
          {messageHistory.current.map((dataObj) => {
            if(dataObj) {
              return <TradeItem key={dataObj.a} data={dataObj} />
            }
            else {
              return null
            }
          })}
        </ul>
      </Box>
    </Flex>
  )
}