import {
  QuickStartContext,
  QuickStartContextValues
} from '@app/OpenShiftConsole/quick-starts/utils/quick-start-context';
import QuickStartDrawer from '@app/OpenShiftConsole/quick-starts/QuickStartDrawer';
import * as React from 'react';
import QuickStartCatalogPage from '@app/OpenShiftConsole/quick-starts/QuickStartCatalogPage';



const QuickStartCatalogFederated: React.FunctionComponent<QuickStartContextValues> = (props) => {
  return (
    <QuickStartContext.Provider value={props}>
      <QuickStartCatalogPage />
    </QuickStartContext.Provider>
  );
};

export default QuickStartCatalogFederated;
