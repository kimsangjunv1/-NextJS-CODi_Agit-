import cryptoJS from 'crypto-js';
import { AccessKeyType } from "@/constants/enum/configCommonType";

export const util = {
    // 문자열 반환
    string: {
        // 함수 : 핸드폰 번호 치환
        formattedPhone: ( target: string ) => {
            let value = target.replace(/-/g, '').replace(/\D/g, '');
            value = value.length > 11 ? value.substring(0, 11) : value;
    
            return value.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
        },
    
        // 함수 : 생년월일 치환
        formattedBirthday: ( target: string ) => {
            const LIMIT = 8;
            let value = target.replace(/-/g, '').replace(/\D/g, '');
            value = value.length > LIMIT ? value.substring(0, LIMIT) : value;
    
            return value.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
        },
    
        // 함수 : 사업자 번호 치환
        formattedBizNo: ( target: string ) => {
            const LIMIT = 10;
            let value = target.replace(/-/g, '').replace(/\D/g, '');
    
            value = value.length > LIMIT ? value.substring(0, LIMIT) : value;
    
            return value.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
        },

        isKorean: ( value: string ) => {
            const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
            const hasHangul = regex.test(value);

            return hasHangul;
        },

        getCurrentTime: ( target?: string, sliceYear:number = 2 ) => {
            const now = target ? new Date(target) : new Date()

            // 연도, 월, 일, 시, 분을 추출
            const year = now.getFullYear().toString().slice(-sliceYear); // 2자리 연도
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
            const day = String(now.getDate()).padStart(2, '0'); // 날짜
            const hours = String(now.getHours()).padStart(2, '0'); // 시간
            const minutes = String(now.getMinutes()).padStart(2, '0'); // 분

            // 원하는 형식으로 출력
            return `${year}.${month}.${day} ${hours}:${minutes}`;
        },

        getCurrentFullTime: () => {
            const now = new Date();
          
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // 밀리초 3자리
          
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        },

        getTestTime: () => {
            // 현재 시간에서 타임존 오프셋을 고려하여 ISO 문자열을 분리
            const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split("T");
            const time = date[1].split(".")[0];

            // 현재 날짜 객체
            const currentDate = new Date();

            // 요일을 문자열로 변환
            const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();

            return { date, time, dayOfWeek }
        },

        getDDay: ( target: string ) => {
            const targetDateStr = target; 
            const targetDate = new Date(targetDateStr); // 문자열을 Date 객체로 변환
            const today = new Date(); // 현재 날짜

            // 시간 차이 계산 (밀리초 기준)
            const diffTime = targetDate.getTime() - today.getTime();

            // 일 단위로 변환
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return {
                status: diffDays >= 0 ? 0 : 1,
                days: diffDays
            }
            // return `${diffDays >= 0 ? `-${diffDays}` : `+${Math.abs(diffDays)}`}`;
        },

        getCommaOnPrice: ( price: string | number ) => {
            if (isNaN(Number(price))) return "0";
            
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },

        getRandomValue: ( length: number ) => {
            const chars: string = "abcdefghijklmnopqrstuvwxyz0123456789";
            let result: string = "";
            
            for (let i = 0; i < length; i++) {
                const randomIndex: number = Math.floor(Math.random() * chars.length);
                
                result += chars[randomIndex];
            }
        
            return result
        },

        // 처음 태그 한 값 / 결제시 확인된 값
        getDistance: ({ lat1, lon1, lat2, lon2 }: { lat1: number, lon1: number, lat2: number, lon2: number }) => {
            const distance = ({ lat1, lon1, lat2, lon2 }: { lat1: number, lon1: number, lat2: number, lon2: number }) => {
                const R = 6371; // 지구 반지름 (단위: km)
                const dLat = deg2rad(lat2 - lat1);
                const dLon = deg2rad(lon2 - lon1);
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                          Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distanceKiloMeters = R * c; // 두 지점 간의 거리 (단위: km)
                const distanceMeters = Math.round( distanceKiloMeters * 1000 )
                return { distanceKiloMeters, distanceMeters };
            }
            
            const deg2rad = (deg: number) => {
                return deg * (Math.PI/180);
            }

            return distance({ lat1, lon1, lat2, lon2 })
        }
    },

    // DOM 조작
    dom: {
        setScrollDefence: (target: boolean) => {
            let scrollTop = 0;
            
            // 현재 스크롤된 화면을 기준으로 FIXED
            const preventScroll = () => {
                // 스크롤 위치를 CSS 변수에 저장
                document.documentElement.style.setProperty('--scroll-top', window.pageYOffset + 'px');

                scrollTop = window.pageYOffset;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollTop}px`;
            }
            
            // 이전에 스크롤 된 값으로 복원
            const restoreScroll = () => {
                const VALUE = document.documentElement.style.getPropertyValue("--scroll-top");

                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo({ top: parseInt(VALUE.split('px')[0]) });
            }
    
            if ( target ) {
                preventScroll();
            } else {
                restoreScroll();
            }
        },

        // 대상의 스크롤 값을 0으로 변경
        setScrollTop: (target: string) => {
            const anchorElement = document.querySelector(target);

            if ( anchorElement ) {
                anchorElement.scrollTo({ top: 0 });   
            }
        },

        setScrollDown: (target: string) => {
            const anchorElement = document.querySelector(target);
    
            if (anchorElement) {
                anchorElement.scrollTo({ top: anchorElement.scrollHeight, behavior: 'smooth' });
            }
        }
    },

    api: {
        checkIsEmptyArray: (data: any) => {
            return !Object.keys( data ).length
        },

        checkResult: (data: any) => {
            // api 호출 후 서버에서 처리한 결과 !== 통신 결과
            // 1이 정상
            return data.status === 200;
        },

        checkResultNew: (data: any) => {
            // api 호출 후 서버에서 처리한 결과 !== 통신 결과
            // 1이 정상
            return data.header?.ResultCode === 0;
        },

        checkIsSuccessful: (data: any) => {
            if ( data ) {
                return data.header.IsSuccessful
            }
        },

        checkCIisAvailable: (token: string) => {
            //파라미터 혹은 쿠키,로컬 스토리지에 있는 CI 값 체크
            // const IS_HAVE_CI = window.localStorage.getItem("ci");
    
            return !!token
        },

        getBodyDataOnResponse: (data: any) => {
            if ( data ) {
                return data.body
            }
        },
    
        handleFailedMsg: (data: any) => {
            // api 콜 이후 발생 msg
            return data.statusText;
        },
    },

    analyze: {
        isMobile: () => {
            // 모바일 여부 확인하기
            // 현재 브라우저의 사용자 에이전트 문자열 가져오기
            const userAgent = navigator.userAgent;
    
            // 사용자 에이전트 문자열에 "Mobile" 또는 "Android" 문자열이 포함되어 있는지 확인
            return /Mobile|Android/.test(userAgent);
        },
        getCookie: (name: string): string | null => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
            return null;
        },
        getCurrentDevEnvironment: () => {
            return process.env.NEXT_PUBLIC_DEV_TYPE === "DEV"
        },
        hasEmptyValue: (obj: any) => {
            return Object.values(obj).some(
                (value) => value === "" || value === null || value === undefined
            )
        },
        debounce:<T extends ( ...args: any[] ) => void> ( fn: T, delay = 500 ) => {
            let timer: ReturnType<typeof setTimeout> | null;

            return ( ...args: Parameters<T> ) => {
                if ( timer ) {
                    clearTimeout( timer );
                }

                timer = setTimeout(() => {
                    fn( ...args );
                }, delay );
            };
        }
    },
}
