import React from 'react';
import styled from 'styled-components';

import Conditions from '../components/Conditions';

import { Box, Container, Heading, Link, Paragraph, Screen, Text, utils } from 'styled-minimal';

const Header = styled.div`
  margin-bottom: ${utils.spacer(3)};
  text-align: center;
`;

const Private = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <Header>
        <Heading>Oh hai!</Heading>
        <Paragraph>
          You can find these in detail at{' '}
          <Link href="https://www.your.md/your-symptoms" target="_blank">
            here
          </Link>
        </Paragraph>
      </Header>
      <Box textAlign="center" mb={4}>
        <Heading as="h5">Here's some Conditions data</Heading>
        <Text fontSize={1}>
          <i>*Medical Conditions...</i>
        </Text>
      </Box>
      <Conditions />
    </Container>
  </Screen>
);

export default Private;
