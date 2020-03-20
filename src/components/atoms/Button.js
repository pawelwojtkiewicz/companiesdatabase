import styled, {css} from 'styled-components';

const Button = styled.button`
    border: 0;
    cursor: pointer;
    
    ${({ bgColor }) => bgColor && css`background-color: ${bgColor};`}

    ${({ searcher }) => 
        searcher &&
        css`
            width: 75px;
            height: 30px;
            margin: 0 10px;
            font-size: 15px;
    `}

    ${({ moreDetails }) => 
        moreDetails &&
        css`
            width: 100px;
            height: 35px;
    `}

    ${({ pagination }) => 
        pagination &&
        css`
            width: 35px;
            height: 35px;
            border: 1px solid #d4c7c7dd;
            margin: 0 2px;
            font-size: 15px;
    `}

    ${({activePagination}) => 
        activePagination &&
        css`
            font-weight: 600;
    `}
`;

export default Button;