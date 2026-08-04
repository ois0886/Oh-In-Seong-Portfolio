type CareerEntry = {
  company: string
  role: string
  periodLabel: string
  location?: string
  start: Date
  end?: Date
  tasks: string[]
  links?: Array<{
    label: string
    url: string
  }>
}

export const careers: CareerEntry[] = [
  {
    company: '(주)차트연구소',
    role: 'Android Developer · 연구원/정규직',
    location: '서울시 강서구',
    periodLabel: '2026.02.09 ~ 재직 중',
    start: new Date(2026, 1, 9),
    tasks: [
      'PowerGraphics Android용 간편 차트(EasyChart)의 21개 화면·제어 구성요소를 개발하고, 선·봉·영역·막대 4종 차트와 종목·조회 주기·지표 설정 기능 구현',
      '고객사 LS증권의 모바일 주식거래 앱(MTS) 투혼에서 기존 Java 시스템과 Android 차트 기능 모듈 간 연동 상태를 점검하고, 조회 데이터 61종·실시간 데이터 21종을 시장·조회 주기별로 검증',
      '화면과 차트 설정 불일치, 한글 데이터 형식 호환, 재사용 화면의 상태 오류, 테마·입력 범위 문제를 해결하고 여러 운영 버전의 수정·검증 절차 관리',
    ],
  },
]

function getCareerMonths(start: Date, end: Date) {
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  const dayAdjustment = end.getDate() < start.getDate() ? 1 : 0
  const totalMonths = years * 12 + months - dayAdjustment

  if (end < start) return 0

  // 재직 첫 달을 1개월로 포함해서 표시한다.
  return totalMonths + 1
}

export function getTotalCareer() {
  const now = new Date()

  const totalMonths = careers.reduce((sum, career) => {
    const end = career.end ?? now
    return sum + getCareerMonths(career.start, end)
  }, 0)

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years > 0 && months > 0) return `${years}년 ${months}개월`
  if (years > 0) return `${years}년`
  if (months > 0) return `${months}개월`
  return '1개월 미만'
}
