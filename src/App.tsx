import React from 'react';
import OgScraper from 'OgScraper';
import styled from 'styled-components';

const App: React.FC = () => {
    return (
        <Container>
            <OgScraper />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

export default App;
