import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  max-width: 900px;
  margin: 50px auto 0 auto;
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
