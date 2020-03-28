import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  max-width: 900px;
  height: 100vh;
  margin: auto;
`;

const MainTemplate = ({children}) => {
    return (
      <StyledWrapper>
        {children}
      </StyledWrapper>
    )
}

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
