import * as React from 'react';
import { RocketIcon } from '@patternfly/react-icons';
import { QuickStartStatus, QuickStart } from '../utils/quick-start-types';
import QuickStartTileHeader from './QuickStartTileHeader';
import QuickStartTileDescription from './QuickStartTileDescription';
import QuickStartTileFooter from './QuickStartTileFooter';

import './QuickStartTile.scss';
import FallbackImg from '@app/OpenShiftConsole/utils/FallbackImg';
import { CatalogTile } from '@patternfly/react-catalog-view-extension';

type QuickStartTileProps = {
  quickStart: QuickStart;
  status: QuickStartStatus;
  isActive: boolean;
  onClick: () => void;
};

const QuickStartTile: React.FC<QuickStartTileProps> = ({
  quickStart,
  status,
  isActive,
  onClick,
}) => {
  const {
    metadata: { name: id },
    spec: { icon, tasks, displayName, description, durationMinutes, prerequisites },
  } = quickStart;

  const quickStartIcon = (
    <FallbackImg
      className="co-catalog-item-icon__img--large"
      src={icon}
      fallback={<RocketIcon />}
    />
  );

  return (
    <CatalogTile
      icon={quickStartIcon}
      className="co-quick-start-tile"
      featured={isActive}
      title={<QuickStartTileHeader name={displayName} status={status} duration={durationMinutes} />}
      onClick={onClick}
      description={
        <QuickStartTileDescription description={description} prerequisites={prerequisites} id={id} />
      }
      footer={<QuickStartTileFooter quickStartId={id} status={status} totalTasks={tasks.length} />}
    />
  );
};

export default QuickStartTile;
