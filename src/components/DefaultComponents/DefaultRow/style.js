import styled from "styled-components";

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: ${props => props.margin};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    gap: ${props => props.gap}
`