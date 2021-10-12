import React, { useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { TradeItem } from "./TradeItem";
import { useGiphy } from "../hooks/useGiphy";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formatCash } from "../util/formatCash";

interface IBinanceData {
  a: number,
  q: string,
  p: string,
  m: boolean,
  T: number,
  gif: string,
}

export const TradesList = (): JSX.Element => {
  const tradesToKeepInMemory = 50;
  const { gifs } = useGiphy(tradesToKeepInMemory, "money")
  const messageHistory = useRef<IBinanceData[]>([])

  //eslint-disable-next-line
  const { lastMessage, readyState } = useWebSocket(
    "wss://fstream.binance.com/ws/btcusdt@aggTrade",
    {onMessage: (msg) => {
      if(msg) {
        let parsed: IBinanceData = JSON.parse(msg.data)
        let dollarQty: number = +parsed.q * +parsed.p
        parsed.gif = gifs[Math.floor(Math.random() * tradesToKeepInMemory)]

        if(dollarQty > qtyFilter) {
          messageHistory.current.unshift(parsed)
          // only keep last 50 trades in memory
          messageHistory.current = messageHistory.current.slice(0,tradesToKeepInMemory)
        }
      }
    }}
  )

  const [qtyFilter, setQtyFilter] = useLocalStorage("qtyFilter", 50000)

  const incrementFilter = () => {
    if(qtyFilter < 1000000) {
      setQtyFilter(qtyFilter + 10000)

      messageHistory.current = messageHistory.current
        .filter(x => +x.q * +x.p >= qtyFilter + 10000)
    }
  }

  const decrementFilter = () => {
    if(qtyFilter > 0) {
      setQtyFilter(qtyFilter - 10000)

      messageHistory.current = messageHistory.current
        .filter(x => +x.q * +x.p >= qtyFilter - 10000)
    }
  }

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
          Show amounts above: <Text as="span" fontWeight="bold">${formatCash(qtyFilter)}</Text>
          <Button size="sm" ml={2} colorScheme="green" onClick={incrementFilter}>
            +
          </Button>
          <Button size="sm" ml={2} colorScheme="red" onClick={decrementFilter}>
            -
          </Button>
        </Text>
        <Text color="white" p={2} textAlign="center">
          Connection: {connectionStatus} | Binance Futures BTCUSDT
        </Text>
        <ul>
          {messageHistory.current.map((dataObj: IBinanceData) => {
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