import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'UI/UX 문서',
      items: [
        {
          type: 'category',
          label: '컴포넌트',
          items: [
            'ui-ux/components/button',
            'ui-ux/components/modal',
            'ui-ux/components/quiz-card',
            'ui-ux/components/timer',
            'ui-ux/components/question-display',
            'ui-ux/components/result-analysis',
            'ui-ux/components/input',
            'ui-ux/components/theme-toggle',
          ],
        },
        {
          type: 'category',
          label: '페이지',
          items: [
            'ui-ux/pages/home',
            'ui-ux/pages/training',
            'ui-ux/pages/exam',
            'ui-ux/pages/mypage',
          ],
        },
        {
          type: 'category',
          label: '플로우',
          items: [
            'ui-ux/flows/user-flows',
            'ui-ux/flows/component-hierarchy',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
