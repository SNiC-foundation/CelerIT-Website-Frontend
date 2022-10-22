import React from 'react';
import { Box } from '@mui/material';

interface Props {
  title: string;
  location: string;
  description?: string;
}

function ActivityComponent(props: Props) {
  const {
    title, location, description,
  } = props;

  let newDescription = description;
  if (description == null || description === '') {
    newDescription = 'A description is not yet set';
  }

  return (
    <Box>
      <h1>
        {`${title}`}
      </h1>
      <h4>
        {`${location}`}
      </h4>
      <p>
        {newDescription}
      </p>
    </Box>
  );
}

ActivityComponent.defaultProps = {
  description: undefined,
};

export default ActivityComponent;
