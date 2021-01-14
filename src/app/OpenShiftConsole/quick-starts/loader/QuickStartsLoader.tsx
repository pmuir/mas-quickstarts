import * as React from 'react';
import { useState } from 'react';
import { QuickStart } from '../utils/quick-start-types';
import QuickStartPermissionChecker from './QuickStartPermissionChecker';
import { allQuickStarts } from '@app/OpenShiftConsole/quick-starts/data/quick-start-test-data';

type QuickStartsLoaderProps = {
  children: (quickStarts: QuickStart[], loaded: boolean) => React.ReactNode;
};

const QuickStartsLoader: React.FC<QuickStartsLoaderProps> = ({ children }) => {
  const [quickStarts, quickStartsLoaded] = useState<QuickStart[]>(allQuickStarts);
  const [allowedQuickStarts, setAllowedQuickStarts] = React.useState<QuickStart[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(!(quickStarts.length > 0));
  const permissionChecks = React.useRef<{ [name: string]: boolean }>({});

  const handlePermissionCheck = React.useCallback(
    (quickStart, hasPermission) => {
      permissionChecks.current[quickStart.metadata.name] = hasPermission;
      if (Object.keys(permissionChecks.current).length === quickStarts.length) {
        const filteredQuickStarts = quickStarts.filter(
          (quickstart) => permissionChecks.current[quickstart.metadata.name]
        );
        setAllowedQuickStarts(filteredQuickStarts);
        setLoaded(true);
      }
    },
    [quickStarts]
  );

  return (
    <>
      {quickStartsLoaded &&
      quickStarts.map((quickstart) => {
        return (
          <QuickStartPermissionChecker
            key={quickstart.metadata.name}
            quickStart={quickstart}
            onPermissionCheck={handlePermissionCheck}
          />
        );
      })}
      {children(allowedQuickStarts, loaded)}
    </>
  );
};

export default QuickStartsLoader;
