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
            'ui-ux/components/question',
            'ui-ux/components/result',
            'ui-ux/components/input',
            'ui-ux/components/theme',
            'ui-ux/components/dropdown',
            'ui-ux/components/tab',
            'ui-ux/components/loading',
            'ui-ux/components/correction-request-modal',
            'ui-ux/components/error-boundary',
          ],
        },
        {
          type: 'category',
          label: '페이지',
          items: [
            'ui-ux/pages/home',
            'ui-ux/pages/training',
            'ui-ux/pages/exam',
            'ui-ux/pages/exam-result',
            'ui-ux/pages/mypage',
            'ui-ux/pages/wrong-answers',
            'ui-ux/pages/admin',
          ],
        },
        {
          type: 'category',
          label: '플로우',
          items: [
            'ui-ux/flows/user-flows',
            'ui-ux/flows/hierarchy',
            'ui-ux/flows/pages',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
