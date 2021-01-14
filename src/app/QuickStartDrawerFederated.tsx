import {
  QuickStartContext,
  useValuesForQuickStartContext
} from '@app/OpenShiftConsole/quick-starts/utils/quick-start-context';
import QuickStartDrawer from '@app/OpenShiftConsole/quick-starts/QuickStartDrawer';
import * as React from 'react';

type QuickStartCatalogFederatedProps = {
  activeQuickStartID: string;
  setActiveQuickStartID: React.Dispatch<React.SetStateAction<string>>
}

const QuickStartDrawerFederated: React.FunctionComponent<QuickStartCatalogFederatedProps> = ({ setActiveQuickStartID, activeQuickStartID, children }) => {

  const values = useValuesForQuickStartContext(activeQuickStartID, setActiveQuickStartID);

  return (
    <QuickStartContext.Provider value={values}>
      <QuickStartDrawer>
        {children}
      </QuickStartDrawer>
    </QuickStartContext.Provider>);
};

export default QuickStartDrawerFederated;
