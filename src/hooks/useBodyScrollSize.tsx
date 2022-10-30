import { useState } from 'react';

import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

interface WindowSize {
  width: number
  height: number
}

export function useBodyScrollSize(): WindowSize {
  const [bodySize, setBodySize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    setBodySize({
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
    });
  };

  useEventListener('resize', handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);

  return bodySize;
}
