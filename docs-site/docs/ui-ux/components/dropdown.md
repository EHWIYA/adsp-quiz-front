# Dropdown 컴포넌트

## 개요
선택 가능한 옵션 목록을 표시하는 드롭다운 컴포넌트. 외부 클릭 및 ESC 키로 닫기 지원.

## Props
- `id`: 드롭다운 ID (선택)
- `value`: 선택된 값 (string | number | null)
- `options`: 옵션 배열 (DropdownOption[])
  - `value`: 옵션 값
  - `label`: 표시 레이블
  - `disabled`: 비활성화 여부 (선택)
- `placeholder`: 플레이스홀더 텍스트 (기본값: '선택하세요')
- `disabled`: 드롭다운 비활성화 여부 (기본값: false)
- `onChange`: 값 변경 핸들러
- `className`: 추가 CSS 클래스 (선택)

## 동작
- 외부 클릭 시 자동 닫기
- ESC 키로 닫기
- 선택된 옵션 하이라이트
- 비활성화 옵션 지원

## 사용 예시
```tsx
<Dropdown
  value={selectedValue}
  options={[
    { value: 1, label: '과목 1' },
    { value: 2, label: '과목 2' },
  ]}
  placeholder="과목을 선택하세요"
  onChange={(value) => setSelectedValue(value)}
/>
```
