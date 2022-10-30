import React from 'react';
import QrScanner from 'qr-scanner';
import { Box, Skeleton } from '@mui/material';

interface Props {
  enabled: boolean;
  // eslint-disable-next-line no-unused-vars
  handleScan: (result: string) => void;
}

function QrScannerComponent({ enabled, handleScan }: Props) {
  const [scanner, setScanner] = React.useState<QrScanner | undefined>(undefined);
  const ref = React.useRef();

  const startScanning = () => {
    if (!scanner) {
      const sc = new QrScanner(ref.current as any, handleScan);
      sc.start().then(() => setScanner(sc));
    }
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.stop();
      scanner.destroy();
      setScanner(undefined);
    }
  };

  // Stop using the camera when we unmount the component
  React.useEffect(() => () => stopScanning());

  React.useEffect(() => {
    if (enabled) {
      startScanning();
    } else {
      stopScanning();
    }
  }, [enabled]);

  const width = ref.current ? (ref.current as any as HTMLElement).clientWidth : 0;
  const height = ref.current ? (ref.current as any as HTMLElement).clientHeight : 0;

  return (
    <Box sx={{ position: 'relative' }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref as any}
        style={{
          width: '100%', height: 'auto', zIndex: 1, position: 'relative',
        }}
      />
      {enabled && (
        <Box style={{
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 0,
        }}
        >
          <Skeleton sx={{ width: '100%', height: '100%' }} animation="pulse" />
        </Box>
      )}
    </Box>
  );
}

export default QrScannerComponent;
