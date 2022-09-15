import React from 'react';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Speaker } from '../../clients/server.generated';
import { apiImageUrl } from '../../helpers/apiHelper';

interface Props {
  speaker: Speaker;
}

function SpeakerCard({ speaker }: Props) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={speaker.name}
        image={apiImageUrl(speaker.imageFilename)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {speaker.name}
        </Typography>
        <Typography variant="body2">
          {speaker.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SpeakerCard;
