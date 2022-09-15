import React from 'react';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Speaker } from '../../clients/server.generated';
import { apiImageUrl } from '../../helpers/apiHelper';
import { dateToTime } from '../../helpers/dateTime';

interface Props {
  speaker: Speaker;
}

function SpeakerCard({ speaker }: Props) {
  const ref = React.useRef(null);

  const width = ref.current ? (ref.current as any).scrollWidth : undefined;

  return (
    <Card>
      <CardMedia
        ref={ref}
        component="img"
        alt={speaker.name}
        image={apiImageUrl(speaker.imageFilename)}
        height={width}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {speaker.name}
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {speaker.description}
        </Typography>
        {speaker.activities.length > 0 ? (
          <>
            <hr style={{ margin: '1rem 0' }} />
            {speaker.activities.map((a) => (
              <Typography variant="body2">
                {`${a.name} (${dateToTime(a.programPart.beginTime)} - ${dateToTime(a.programPart.endTime)})`}
              </Typography>
            ))}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default SpeakerCard;
