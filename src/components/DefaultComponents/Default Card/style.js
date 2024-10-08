import styled from 'styled-components';

export const DefaultCardStyle = styled.div.attrs({
    className: 'default-card'
})`
    position: relative;
    min-height: 100%;
    height: 100%;
    width: ${props => props.size == 'xs' ? "10%" : props.size == 's' ? "25%" : props.size == 'm' ? "50%" : props.size == 'l' ? "75%" : props.size == "xl" ? "100%" : props.size == undefined ? "100%" : props.size};
    padding: 20px; /* Aumentando o padding */
    border-radius: 12px; /* Arredondando mais os cantos */
    background-color: ${props => props.backGroundColor ?? 'var(--theme-default-card-background)'};
    margin: ${props => props.margin};
    border: 1px solid rgba(0, 0, 0, 0.1); /* Sutil ajuste da borda */
    box-shadow: 0 4px 8px var(--theme-default-card-shadow); /* Adicionando sombreamento */
    transition: box-shadow 0.3s ease; /* Suave transição no hover */
    
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Efeito de sombra maior no hover */
    }
`;
