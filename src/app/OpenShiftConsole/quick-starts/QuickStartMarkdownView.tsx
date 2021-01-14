import * as React from 'react';
import { extension } from 'showdown';
import { SyncMarkdownView } from '@app/OpenShiftConsole/components/markdown-view';
import { HIGHLIGHT_REGEXP } from '@app/OpenShiftConsole/markdown-highlight-extension/highlight-consts';
import { MarkdownHighlightExtension } from '@app/OpenShiftConsole/markdown-highlight-extension';

const EXTENSION_NAME = 'quickstart';
extension(EXTENSION_NAME, () => {
  return [
    {
      type: 'lang',
      regex: HIGHLIGHT_REGEXP,
      replace: (text: string, linkLabel: string, linkType: string, linkId: string): string => {
        if (!linkLabel || !linkType || !linkId) return text;
        return `<button class="pf-c-button pf-m-inline pf-m-link" data-highlight="${linkId}">${linkLabel}</button>`;
      },
    },
  ];
});

type QuickStartMarkdownViewProps = {
  content: string;
  exactHeight?: boolean;
};

const QuickStartMarkdownView: React.FC<QuickStartMarkdownViewProps> = ({
  content,
  exactHeight,
}) => {
  return (
    <SyncMarkdownView
      content={content}
      exactHeight={exactHeight}
      extensions={[EXTENSION_NAME]}
      renderExtension={(docContext) => (
        <MarkdownHighlightExtension key={content} docContext={docContext} />
      )}
    />
  );
};
export default QuickStartMarkdownView;
