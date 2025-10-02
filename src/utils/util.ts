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

        getCurrentDate: ( target?: string, sliceYear:number = 2 ) => {
            const now = target ? new Date(target) : new Date()

            // 연도, 월, 일, 시, 분을 추출
            const year = now.getFullYear().toString().slice(-sliceYear); // 2자리 연도
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
            const day = String(now.getDate()).padStart(2, '0'); // 날짜
            const hours = String(now.getHours()).padStart(2, '0'); // 시간
            const minutes = String(now.getMinutes()).padStart(2, '0'); // 분

            // 원하는 형식으로 출력
            return `${year}.${month}.${day}`;
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
        },
        getRandomName: () => {
            const firstParts = [
                "푸른", "빠른", "은빛", "별빛", "붉은", "노란", "초록", "깊은",
                "작은", "커다란", "달콤한", "불타는", "얼어붙은", "반짝이는"
            ];
            const secondParts = [
                "하마", "펭귄", "토끼", "여우", "고양이", "강아지", "수달",
                "곰", "사슴", "호랑이", "돌고래", "매", "까치", "참새",
                "바위", "달빛", "바람", "구름", "불꽃", "나무"
            ];

            let name = "";
            let attempts = 0;

            // 조건 (4~6글자)을 만족할 때까지 반복
            while ((name.length < 4 || name.length > 6) && attempts < 20) {
                const first = firstParts[Math.floor(Math.random() * firstParts.length)];
                const second = secondParts[Math.floor(Math.random() * secondParts.length)];
                name = first + second;
                attempts++;
            }

            return name;
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
        },

        setCopyOnClipboard: async ( text: string ) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // 구형 브라우저 fallback
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
        }
    },

    api: {
        checkIsSuccessful: (data: any) => {
            if ( data ) {
                return data.header.IsSuccessful
            }
        },

        getBodyDataOnResponse: (data: any) => {
            if ( data ) {
                return data.body
            }
        },

        getApiReponse: ({ msg, code = 999, success = false, payload = "", data = {}, endpoint = "" }: { msg: string, code?: number, success?: boolean, payload?: any, data?: any, endpoint?: string }) => {
            const result = {
                header: {
                    IsSuccessful: success,
                    ResultCode: code,
                    ResultMsg: msg,
                    pageNum: 0,
                    pageSize: 0,
                    totalCount: 0,
                    payload: payload,
                    endpoint: endpoint
                },
                body: data
            }

            return result;
        },

        debounce<T extends (...args: any[]) => void> (
            func: T,
            delay: number
        ): (...args: Parameters<T>) => void {
            let timerId: ReturnType<typeof setTimeout> | null;

            return (...args: Parameters<T>) => {
                if (timerId) {
                    clearTimeout(timerId);
                }
                timerId = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        }
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
        },
        async convertSha256( value: string )  {
            const msgBuffer = new TextEncoder().encode(value);
            const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        },
    },
}
