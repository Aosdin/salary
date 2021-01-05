import { register } from 'register-service-worker'

import store from '@/store'

if (process.env.NODE_ENV === 'production') {
  register('/service-worker.js', {
    ready() {
      // eslint-disable-next-line no-console
      console.info('서비스 워커가 활성화되었습니다.')
    },
    registered() {
      // eslint-disable-next-line no-console
      console.info('서비스 워커가 등록되었습니다.')
    },
    cached() {
      // eslint-disable-next-line no-console
      console.info('콘텐츠가 오프라인 사용을 위해 캐시되었습니다.')
    },
    updatefound() {
      // eslint-disable-next-line no-console
      console.info('새로운 콘텐츠가 다운로드 중입니다.')
    },
    updated(reg) {
      // eslint-disable-next-line no-console
      console.info('새로운 콘텐츠를 사용할 수 있습니다. 새로 고침하세요.')
      store.commit(`app/setSWRegistrationForNewContent`, reg)
    },
    offline() {
      // eslint-disable-next-line no-console
      console.info(
        '인터넷 연결이 없습니다. 앱이 오프라인 모드에서 실행 중입니다.'
      )
    },
    error(error) {
      // eslint-disable-next-line no-console
      console.error('서비스 워커 등록 중 오류:', error)
    }
  })
}

if ('serviceWorker' in navigator) {
  let refreshing = false
  // This is triggered when a new service worker take over
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    refreshing = true

    window.location.reload()
  })
}
