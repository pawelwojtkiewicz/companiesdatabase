import styled from 'styled-components';
import LoaderSvg from 'assets/loader.svg';

const Loader = styled.div`
    width: 100%;
    height: 100%;
    background: white url(${LoaderSvg}) no-repeat;
    background-position: center;
`;

export default Loader;