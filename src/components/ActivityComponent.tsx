import React from 'react';
import { Box } from '@mui/material';

interface Props {
  title: string;
  location: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}

function ActivityComponent(props: Props) {
  const {
    title, location, startTime, endTime, description,
  } = props;
  return (
    <Box>
      <h1>
        {`${title}`}
      </h1>
      <h4>
        {`${location}, ${startTime.getUTCHours().toString().padStart(2, '0')}:${startTime.getUTCMinutes().toString().padStart(2, '0')}-${endTime.getUTCHours().toString().padStart(2, '0')}:${endTime.getUTCMinutes().toString().padStart(2, '0')}`}
      </h4>
      <p>
        {description}
      </p>
    </Box>
  );
}

ActivityComponent.defaultProps = {
  description: 'A description is not yet set',
};

export default ActivityComponent;
