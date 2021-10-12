import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getQtyColor } from "../util/getQtyColor";
import { formatCash } from "../util/formatCash";
import { format as timeago } from "timeago.js";
import { shorterTimeago } from "../util/shorterTimeago";
import "./TradeItemAnim.css";

interface IBinanceData {
  data: {
    a: number,
    q: string,
    p: string,
    m: boolean,
    T: number,
    gif: string,
  }
}

export const TradeItem = ({ data }: IBinanceData): JSX.Element => {
  const dollarQty: number = +data.q * +data.p
  const displayGif: boolean = dollarQty >= 200000

  const textStyle = {
    fontWeight: "medium",
    fontSize: "16px",
    color: "white"
  }

  return (
    <Flex
      className="fade-in-top"
      bgColor={data.m ? getQtyColor(dollarQty, "sell") : getQtyColor(dollarQty, "buy")}
      bgImage={displayGif ? `url(${data.gif})` : undefined}
      p={3}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgBlendMode="soft-light"
      justifyContent="space-between"
    >
      <Text className="price" {...textStyle}>
        {(+(+data.p).toFixed(0)).toLocaleString()}
      </Text>
      <Text className="qty" {...textStyle}>
        <i className="fas fa-dollar-sign"></i>{" " + formatCash(dollarQty)}
      </Text>
      <Text className="time-ago" w="20%" {...textStyle}>
        {shorterTimeago(timeago(data.T))}
      </Text>
    </Flex>
  )
}
