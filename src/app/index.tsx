import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { Loading } from './components/Loading/Loading';
import '../i18n/i18n';
import { ErrorBoundary } from '@app/components/ErrorBoundary';
import {
  QuickStartContext,
  useValuesForQuickStartContext
} from '@app/OpenShiftConsole/quick-starts/utils/quick-start-context';
import QuickStartDrawer from '@app/OpenShiftConsole/quick-starts/QuickStartDrawer';
import { useState } from 'react';


const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = React.useState(true);

  const [activeQuickStartID, setActiveQuickStartID] = useState<string>('');

  const valuesForQuickstartContext = useValuesForQuickStartContext(activeQuickStartID, setActiveQuickStartID);

  if (!initialized) return <Loading />;

  // TODO - index doing router is not desired.
  // Split to App.tsx etc.
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <AppLayout>
            <QuickStartContext.Provider value={valuesForQuickstartContext}>
              <QuickStartDrawer>
                <AppRoutes />
              </QuickStartDrawer>
            </QuickStartContext.Provider>
          </AppLayout>
        </ErrorBoundary>
      </React.Suspense>
    </Router>
  );
};
export default App;
