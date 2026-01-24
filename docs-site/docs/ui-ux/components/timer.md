# Timer 컴포넌트

## 개요
시험 시간을 표시하는 타이머 컴포넌트. 일시정지/재개 기능 제공.

## Props
- `seconds`: 남은 시간 (초 단위)
- `isRunning`: 실행 중 여부 (기본값: false)
- `onPause`: 일시정지 핸들러 (선택)
- `onResume`: 재개 핸들러 (선택)
- `onTick`: 시간 감소 시 호출되는 콜백 (선택)
- `onTimeUp`: 시간 종료 시 호출되는 콜백 (선택)

## 표시 형식
- 1시간 미만: MM:SS
- 1시간 이상: HH:MM:SS

## 사용 예시
```tsx
<Timer
  seconds={5400}
  isRunning={isRunning}
  onPause={handlePause}
  onResume={handleResume}
/>
```
