import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Select,
  SelectVariant,
  SelectOption,
} from '@patternfly/react-core';
import { QuickStartStatus } from '../utils/quick-start-types';
import { QUICKSTART_SEARCH_FILTER_KEY, QUICKSTART_STATUS_FILTER_KEY } from '../utils/const';

import './QuickStartCatalogFilter.scss';
import { useQueryParams } from '@app/OpenShiftConsole/hooks/useQueryParams';
import { removeQueryArgument, setQueryArgument } from '@app/utils/router';
import { useState } from 'react';

type QuickStartCatalogFilterProps = {
  quickStartsCount: number;
  quickStartStatusCount: Record<QuickStartStatus, number>;
};

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}


const QuickStartCatalogFilter: React.FC<QuickStartCatalogFilterProps> = ({
  quickStartsCount,
  quickStartStatusCount,
}) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState([]);
  const statusTypes = {
    [QuickStartStatus.COMPLETE]: t('quickstart~Complete ({{statusCount, number}})', {
      statusCount: quickStartStatusCount[QuickStartStatus.COMPLETE],
    }),
    [QuickStartStatus.IN_PROGRESS]: t('quickstart~In progress ({{statusCount, number}})', {
      statusCount: quickStartStatusCount[QuickStartStatus.IN_PROGRESS],
    }),
    [QuickStartStatus.NOT_STARTED]: t('quickstart~Not started ({{statusCount, number}})', {
      statusCount: quickStartStatusCount[QuickStartStatus.NOT_STARTED],
    }),
  };

  const [selectedFilters, setSelectedFilters] = React.useState(
    statusFilters.map((filter) => statusTypes[filter]),
  );

  const onRowfilterSelect = React.useCallback(
    (e) => {
      setIsDropdownOpen(false);
      const selection = e.target.parentElement.getAttribute('data-key');
      const selectedFiltersList = statusFilters.includes(selection)
        ? statusFilters.filter((status) => status !== selection)
        : [...statusFilters, selection];
      setSelectedFilters(selectedFiltersList.map((filterKey) => statusTypes[filterKey]));
      if (selectedFiltersList.length > 0) {
        setQueryArgument('status', selectedFiltersList.join(','));
      } else {
        removeQueryArgument(QUICKSTART_STATUS_FILTER_KEY);
      }
    },
    [statusFilters, statusTypes],
  );

  const dropdownItems = Object.entries(statusTypes).map(([key, val]) => (
    <SelectOption key={key} data-key={key} value={val} />
  ));

  return (
    <Toolbar className="co-quick-start-catalog-filter__flex">
      <ToolbarContent>
        <ToolbarItem className="co-quick-start-catalog-filter__input">
          <SearchInput
            placeholder={t('quickstart~Filter by keyword...')}
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onClear={() => setSearchQuery('')}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Select
            variant={SelectVariant.checkbox}
            aria-label={t('quickstart~Select filter')}
            isOpen={isDropdownOpen}
            onToggle={(isEnabled) => setIsDropdownOpen(isEnabled)}
            placeholderText={t('quickstart~Status')}
            onSelect={onRowfilterSelect}
            selections={selectedFilters}
          >
            {dropdownItems}
          </Select>
        </ToolbarItem>
        <ToolbarItem
          className="co-quick-start-catalog-filter__count"
          alignment={{ default: 'alignRight' }}
        >
          {t('quickstart~{{count, number}} item', { count: quickStartsCount })}
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

export default QuickStartCatalogFilter;
