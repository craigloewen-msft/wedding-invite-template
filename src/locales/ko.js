export default {
  // Common
  details: 'Details',
  gallery: 'Gallery',
  faq: 'FAQ',
  
  // Intro section
  intro: {
    dear: '사랑하는: {name}님',
    youreInvited: '당신을 초대합니다...',
    weddingTitle: '신랑과 신부의 \n결혼 축하 피로연',
    openInvitation: '초대장 열기'
  },
  
  // Details section
  eventDetails: {
    title: '피로연 세부사항',
    dateTimeTitle: '날짜 및 시간',
    venueTitle: '장소',
    dressCodeTitle: '드레스 코드',
    parkingTitle: '주차 안내',
    event1: {
      title: '🎪 행사 1: 제목',
      dateTime: '[행사 1 시간 및 날짜]',
      venueNote: '실내 행사입니다.',
      dressCode: '세미정장 권장.',
      parking: '행사장 무료 주차'
    },
    event2: {
      title: '🌴 행사 2: 제목',
      dateTime: '[행사 2 시간 및 날짜]',
      dressCode: '캐주얼 복장',
      parking: '$5 공원 주차장'
    }
  },
  
  // RSVP section
  rsvp: {
    title: '참석여부를 1월 1일까지 제출해 주세요',
    groupName: '가정:',
    groupNamePlaceholder: '가정',
    reservedCount: '귀하의 가정에서 {count}석을 예약했습니다. 몇 명이 오실 예정인가요?',
    attendWhichDays: '참석할 날짜를 선택하세요 (해당하는 모든 날짜 선택):',
    day1: '[행사 날짜 1]',
    day2: '[행사 날짜 2]',
    foodPreference: '행사 날짜 1 식사 선호도:',
    person: '{number}번째 사람:',
    personName: '이름:',
    personNamePlaceholder: '이름을 입력하세요',
    foodChoice: '행사 날짜 1 식사 선택:',
    selectOne: '하나 선택',
    steak: '스테이크',
    fish: '생선',
    vegetarian: '채식',
    dietaryRestrictions: '알레르기 및 주의사항 (선택사항):',
    dietaryPlaceholder: '알레르기나 특별식 요청이 있나요?',
    submitRsvp: '확인',
    hotelReserved: '귀하를 위한 호텔이 예약되어 있습니다다!',
    hotelDescription: '<a href="[호텔 지도 링크]" target="_blank" rel="noopener noreferrer">[호텔 이름]에</a> [행사 날짜]에 방이 예약되어 있습니다.',
    hotelCheckbox: '네, [행사 날짜] 무료 호텔 룸을 이용하겠습니다',
    errors: {
      enterGroupName: '그룹명을 입력해 주세요.',
      enterPersonName: '각 사람의 이름을 입력해 주세요.',
      selectOneDay: '참석할 날짜를 모두 선택해 주세요.',
      selectFoodPreference: '행사 날짜 1에 참석하는 각 사람의 음식 선호도를 선택해 주세요.',
      networkError: '네트워크 오류입니다. 다시 시도해 주세요. 계속 실패하면 신랑 신부에게 이메일이나 문자로 세부사항을 보내주세요. 오류로 죄송합니다!'
    },
    success: '참석 확인이 성공적으로 제출되었습니다!'
  },
  
  // Gallery section
  gallerySection: {
    title: '갤러리',
    openImage: '갤러리 이미지 {number}를 전체화면으로 열기',
    imageAlt: '갤러리 이미지 {number}',
    closeImage: '이미지 닫기',
    imageLabel: '{total} 중 {current}번째 이미지'
  },
  
  // FAQ section
  faqSection: {
    title: '자주 묻는 질문',
    questions: {
      whatToBring: {
        question: '무엇을 가져와야 하나요?',
        answer: '행사 세부사항에서 특정 요구사항을 확인해 주세요. 드레스 코드에 적합한 편안한 복장을 권장합니다.'
      },
      plusOne: {
        question: '동반자를 데려올 수 있나요?',
        answer: '참석 확인 시 가정에서 몇 명이 참석할지 명시할 수 있습니다. 그룹 인원을 조정해야 하는 경우 직접 연락해 주세요.'
      },
      giftRegistry: {
        question: '선물 목록이 있나요?',
        answer: '직접 참석해 주시는 것이 가장 큰 선물입니다! 선물을 주고 싶으시다면 [미래/신혼여행/집]을 위한 기부를 고려해 주시면 감사하겠지만 필수는 아닙니다.'
      },
      weather: {
        question: '비가 오면 어떻게 하나요?',
        answer: '악천후를 위한 비상 계획이 준비되어 있습니다. 변경사항이 있을 경우 공유하겠습니다.'
      },
      directions: {
        question: '행사 장소로는 어떻게 가나요?',
        answer: '두 위치 모두 세부사항 섹션에 쉬운 네비게이션을 위한 구글 맵 링크가 있습니다.'
      },
      dietary: {
        question: '음식 제한이 있으면 어떻게 하나요?',
        answer: '참석 확인 양식에 알레르기나 식사 선호도를 명시해 주시면 최선을 다해 맞춰 드리겠습니다.'
      }
    }
  },
  
  // Password Gate section
  passwordGate: {
    title: '초대장',
    subtitle: '비밀번호를 입력하세요.',
    selectLanguage: 'Language / 언어',
    passwordPlaceholder: '비밀번호',
    enterButton: '입력',
    clearButton: '지우기',
    errors: {
      enterPassword: '비밀번호를 입력해 주세요.',
      notConfigured: '비밀번호가 설정되지 않았습니다. 사이트 관리자에게 문의하세요.',
      incorrect: '잘못된 비밀번호입니다. 다시 시도해 주세요.',
      verificationError: '비밀번호 확인 중 오류가 발생했습니다.'
    }
  },
  
  // Footer section
  footer: {
    madeBy: 'Made with',
    openSource: 'this open source template',
    artCredit: ''
  },
}