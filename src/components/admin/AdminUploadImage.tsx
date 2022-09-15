import React from 'react';
import { Image } from '@mui/icons-material';
import { Client } from '../../clients/server.generated';
import AdminTableButton from './AdminTableButton';

interface Props {
  id: number;
  entity: string;
}

function AdminUploadImage({ id, entity }: Props) {
  const [loading, setLoading] = React.useState(false);

  const handleFile = async (event: React.ChangeEvent) => {
    setLoading(true);
    // @ts-ignore
    const files = event.target.files as FileList | undefined;
    if (!files || files.length === 0) {
      setLoading(false);
      return;
    }

    const fileName = files[0].name;
    const data = await files[0];

    const client = new Client();
    switch (entity) {
      case 'partner':
        await client.uploadPartnerLogo(id, { fileName, data });
        break;
      case 'speaker':
        await client.uploadSpeakerImage(id, { fileName, data });
        break;
      default:
        throw new Error(`Unknown entity: ${entity}`);
    }

    setLoading(false);
  };

  if (entity !== 'partner' && entity !== 'speaker') {
    return null;
  }

  return (
    // @ts-ignore
    <AdminTableButton component="label" disabled={loading}>
      <Image fontSize="small" />
      <input
        type="file"
        accept="image/*"
        name="logo"
        hidden
        onChange={(event) => handleFile(event)}
      />
    </AdminTableButton>
  );
}

export default AdminUploadImage;
