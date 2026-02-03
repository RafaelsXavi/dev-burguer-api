import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Roboto', sans-serif;
    }
    button {
        cursor: pointer;
    }
    body {
        background-color: #f5f5f5;
        color: #333;    
    }
`;