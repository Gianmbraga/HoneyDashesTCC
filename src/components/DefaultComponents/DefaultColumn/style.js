import styled from "styled-components"

export const Column = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: ${props => props.margin};
    gap: ${props => props.gap};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems}
`