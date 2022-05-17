import React from 'react';
import { Container } from '@mui/material';
import Activity from './Activity';

function Program() {
  return (
    <Container>
      <Activity title="Melden voor werkmoment" location="Traverse 2.13" startTime={new Date(1652778000000)} endTime={new Date(1652778300000)} description="Traverse is kut" />
      <Activity title="Een bak vouwen" location="GEWIS" startTime={new Date(1652803200000)} endTime={new Date(1652804100000)} />
    </Container>
  );
}

export default Program;
