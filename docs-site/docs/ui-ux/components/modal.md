# Modal 컴포넌트

## 개요
포털을 사용한 모달 오버레이 컴포넌트. 배경 클릭 시 닫기 기능 제공.

## Props
- `isOpen`: 모달 표시 여부 (boolean)
- `onClose`: 닫기 핸들러 함수
- `title`: 모달 제목 (선택)
- `children`: 모달 내용
- `footer`: 하단 푸터 영역 (선택)

## 동작
- 모달 열림 시 body 스크롤 잠금
- 배경(overlay) 클릭 시 닫기
- ESC 키 지원 (추후 구현 예정)

## 사용 예시
```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="확인">
  <p>정말 제출하시겠습니까?</p>
  <Modal.Footer>
    <Button onClick={handleSubmit}>제출</Button>
  </Modal.Footer>
</Modal>
```
