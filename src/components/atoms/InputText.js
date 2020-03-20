import styled, {css} from 'styled-components';

const InputText = styled.input`
    margin: 0;

    ${({ searcher }) => 
        searcher &&
        css`
            width: 290px;
            height: 24px;
            padding: 0 0 0 10px;
    `}
`;

export default InputText;