import * as React from 'react';
import * as classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  DrawerPanelContent,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Title,
} from '@patternfly/react-core';

import { useScrollDirection, ScrollDirection } from '@app/OpenShiftConsole/hooks/scroll';
import { QuickStart } from './utils/quick-start-types';
import './QuickStartPanelContent.scss';
import { AsyncComponent } from '@app/OpenShiftConsole/utils/async';
import QuickStartController from '@app/OpenShiftConsole/quick-starts/QuickStartController';

type HandleClose = () => void;

type QuickStartPanelContentProps = {
  quickStarts: QuickStart[];
  activeQuickStartID: string;
  handleClose: HandleClose;
};

const QuickStartPanelContent: React.FC<QuickStartPanelContentProps> = ({
  quickStarts = [],
  handleClose,
  activeQuickStartID,
}) => {
  const [scrollDirection, handleScrollCallback] = useScrollDirection();
  const { t } = useTranslation();
  const quickStart = quickStarts.find((qs) => qs.metadata.name === activeQuickStartID);

  const headerClasses = classNames('co-quick-start-panel-content-head', {
    'pf-u-box-shadow-sm-bottom':
      scrollDirection && scrollDirection !== ScrollDirection.scrolledToTop,
  });

  return quickStart ? (
    <DrawerPanelContent onScroll={handleScrollCallback}>
      <div className={headerClasses}>
        <DrawerHead>
          <div className="co-quick-start-panel-content__title">
            <Title
              headingLevel="h1"
              size="xl"
              style={{ marginRight: 'var(--pf-global--spacer--md)' }}
            >
              {quickStart?.spec.displayName}{' '}
              <small className="co-quick-start-panel-content__duration text-secondary">
                {t('quickstart~{{duration, number}} minutes', {
                  duration: quickStart?.spec.durationMinutes,
                })}
              </small>
            </Title>
          </div>
          <DrawerActions>
            <DrawerCloseButton onClick={handleClose} />
          </DrawerActions>
        </DrawerHead>
      </div>
      <DrawerPanelBody>
        <QuickStartController quickStart={quickStart} />
      </DrawerPanelBody>
    </DrawerPanelContent>
  ) : null;
};

export default QuickStartPanelContent;
