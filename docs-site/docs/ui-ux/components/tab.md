# Tab 컴포넌트

## 개요
탭 인터페이스를 제공하는 컴포넌트. 여러 콘텐츠 섹션을 탭으로 전환.

## Props
- `tabs`: 탭 배열
  - `id`: 탭 ID
  - `label`: 탭 레이블
- `activeTab`: 활성 탭 ID
- `onTabChange`: 탭 변경 핸들러
- `children`: 탭 콘텐츠

## 동작
- 활성 탭 하이라이트
- 탭 클릭 시 콘텐츠 전환
- 탭 버튼과 콘텐츠 영역 분리

## 사용 예시
```tsx
<Tab
  tabs={[
    { id: 'tab1', label: '탭 1' },
    { id: 'tab2', label: '탭 2' },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
>
  {activeTab === 'tab1' && <Tab1Content />}
  {activeTab === 'tab2' && <Tab2Content />}
</Tab>
```
