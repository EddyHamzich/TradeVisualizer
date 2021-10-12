import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { TradesList } from "./TradesList";

function App(): JSX.Element {
  return (
    <Box className="app">
      <Navbar />
      <TradesList />
    </Box>
  )
}

export default App