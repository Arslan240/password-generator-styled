import { ThemeProvider } from "styled-components"
import theme from "./Theme/Theme"
import styled from "styled-components"
import PasswordCard from "./Components/PasswordCard"

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.accent};
  * {
    box-sizing: border-box;
  }

`

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordCard/>
      </Container>
    </ThemeProvider>
  )
}

export default App
