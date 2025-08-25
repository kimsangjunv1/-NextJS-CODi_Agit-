import { create } from 'zustand';
import { Config, Interview } from '@/types/previewConfigDTO';

export interface Field {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    maxLength?: number;
    min?: number;
    max?: number;
    step?: number;
    options?: { value: string; label: string }[];
    defaultValue?: any;
    unit?: string;
    accept?: string; // for file types
    description?: string;
    rows?: number; // for textarea
    action?: string; // for button type
    // 기타 필드 속성들이 있다면 여기에 추가
}

export const useConfigStore = create<Config>((set, get, store) => ({
    landing: {
        info: {
            type: "image",
            image: {
                contents: [],
                repeat: false,
            },
        },
        style: {
            background: "#ededed",
        }
    },

    notice: {
        info: {
            type: "",
            title: "",
            content: "",
            image: [],
        },
        button: {
            enabled: false,
            text: "더보기",
            url: "/",
        },

        style: {
            text: "#000000",
            align: "center",
            background: "#ffffff",
            background_fixed: "#ffffff",
        }
    },

    displayOrder: [
        {
            "order": 1,
            "active": true
        },
        {
            "order": 2,
            "active": true
        },
        {
            "order": 3,
            "active": true
        },
        {
            "order": 4,
            "active": true
        },
        {
            "order": 5,
            "active": true
        },
        {
            "order": 6,
            "active": true
        },
        {
            "order": 7,
            "active": true
        },
        {
            "order": 9,
            "active": true
        },
        {
            "order": 10,
            "active": true
        },
        {
            "order": 11,
            "active": true
        },
        {
            "order": 12,
            "active": true
        },
        {
            "order": 13,
            "active": true
        },
    ],

    wedding: {
        info: {
            url: "/",
            date: `2028-09-09 12:09`,
            parking: "지하주차장 8~10층까지",
            contact: "02-2030-4972",
            address: "서울특별시 강남구 강남대로 104-1",
            locationName: "그랜드 부다페스트 호텔",

            time: {
                start: "16:05",
                description: "오후 6시에 시작합니다~!",
            },

            map: {
                enable: false,
                provider: ["google"]
            }
        },
        style: {
            text: "#000000",
            background: "#ededed"
        }
    },

    greeting: {
        info: {
            title: "자리를 빛내주세요.",
            content: "모두 참석해주시어\n자리를 빛내주시기 바랍니다.\n앞으로 신랑과 함께 즐거운 신혼을 이어나가겠습니다\n\n감사합니다.",
            signature: "홍길동",
        },
        style: {
            text: "#000000",
            background: "#ededed",
            align: "center",
        }
    },

    groomAndBrideInfo: {
        info: {
            groom: {
                self: "이민호",
                father: "김만덕",
                mother: "이미숙",
            },
            bride: {
                self: "박다솜",
                father: "박원훈",
                mother: "김미현",
            }
        },
        style: {
            text: "#000000",
            background: "#ededed",
        }
    },

    gallery: {
        info: {
            image: [],
        },
        style: {
            background: "#ededed"
        }
    },

    quote: {
        info: {
            author: "김민수",
            message: "안녕 오늘은 나의 날,, 이야"
        },
        style: {
            text: "#000000",
            align: "center",
            background: "#ededed"
        }
    },

    location: {
        info: {
            name: "펜트리스 타워 2",
            address: "서울특별시 강남구 강남대로 104",
            contact: "02-303-4920",
            parking: "주차 최대 4층까지 가능"
        }
    },

    dDay: {
        info: {
            date: "2027-01-01",
            type: "basic",
        },

        style: {
            enable: true,
            text: "#000000",
            background: "#ededed"
        }
    },

    guestBook: {
        info: {
            open_range: "public",
            type: "text",
            timestamp: true,
            password: false,
        },
        style: {
            align: "center",
            text: "#000000",
            background: "#ffffff"
        }
    },

    interview: {
        info: {
            title: "우리의 시작",
            qna: [
                {
                    question: "나는 무엇입니까?",
                    answer: "나는 고라니 입니다.",
                },
                {
                    question: "나는 동물입니까?",
                    answer: "아뇨 동물은 아니고 두발로 걸어다니는 사람입니다.",
                },
            ]
        },

        style: {
            text: "#000000",
            background: "#ededed",
            chat: {
                question: {
                    text: "#000000",
                    background: "#EDEDED",
                },
                answer: {
                    text: "#000000",
                    background: "#EDEDED",
                }       
            }
        }
    },

    profile: {
        info: {
            groom: {
                src: [],
                description: "안녕하세요 신부 OOO 입니다,\n앞으로 아름답게 살아가겠습니다.\n\n감사합니다.",
            },
            bride: {
                src: [],
                description: "안녕하세요 신랑 OOO 입니다,\n앞으로 아름답게 살아가겠습니다.\n\n감사합니다.",
            },
        },
        style: {
            text: "#000000",
            background: "#ffffff",
            shape: "circle"
        },
    },

    traffic: {
        info: {
            bus: {
                enabled: true,
                no: ["320-3", "920"],
                stopName: "국민은행 앞 정거장",
            },
            subway: {
                enabled: true,
                exit: ["1", "2"],
                line: "3호선",
            },
            etc: {
                enabled: true,
                transport: "전기 자전거 이용 가능",
            }
        },
        style: {
            align: "center",
            text: "#000000",
            background: "#ffffff",
            icon: {
                enable: true,
            }
        }
    },

    flower: {
        info: {
            fixed: false,
            message: "화한은 더이상 필요없어",
        },
        style: {
            text: "#000000",
            background: "#ffffff"
        }
    },

    intro: {
        info: {
            title: "저희의 결혼식에 초대할게요",
            description: "오신걸 환영해요"
        },

        style: {
            background: "#ededed",
            title: {
                color: "#000000",
                size: 18,
            },
            description: {
                color: "#00000090",
                size: 14,
            },
            animation: {
                type: "fade",
                duration: 0.5,
                delay: 1
            }
        }
    },

    share: {
        info: {
            title: "이민호&박다솜의 결혼식에 초대할게요",
            description: "저희 두 사람이 사랑과 믿음으로 한 가정을 이루려 합니다. 귀한 걸음 하시어 저희의 새로운 시작을 축복해 주시면 더 없는 기쁨이겠습니다.",
            button: {
                enabled: false,
            },
            image: [],
            target_platform: [],
        }
    },

    common: {
        default: {
            id: "",
            user_id: "",
        },
        info: {
            url: "pleaseSetUrl",
            lastModified: "2020-01-01",
        },
        function: {
            scrollbar: false,
            zoom: false,
            music: {
                enabled: false,
                file: [],
                autoPlay: false,
            }
        },
        style: {
            text: {
                main: "#333333",
                sub: "#666666",
                link: "#007BFF",
            },
            theme: {
                main: "#FF5733",
                sub: "#3366FF",
                default: "#FF5733"
            }
        }
    },

    config: {},
    

    // 개별 설정 값을 업데이트하는 액션
    setLanding: ( landing ) => set(( state ) => ({
        landing: {
            ...state.landing,
            ...landing
        }
    })),

    setNotice: ( notice ) => set((state) => ({
        notice: {
            info: {
                ...state.notice.info,
                ...notice.info,
            },
            button: {
                ...state.notice.button,
                ...notice.button,
            },
            style: {
                ...state.notice.style,
                ...notice.style,
            },
        }
    })),

    setDisplayOrder: ( displayOrder ) => set(() => ({ displayOrder: displayOrder })),

    setWedding: ( wedding ) => set((state) => ({
        wedding: {
            info :{
                ...state.wedding.info,
                ...wedding.info
            },
            style: {
                ...state.wedding.style,
                ...wedding.style
            }
        }
    })),

    setGreeting: ( greeting ) => set((state) => ({
        greeting: {
            info: {
                ...state.greeting.info,
                ...greeting.info
            },
            style: {
                ...state.greeting.style,
                ...greeting.style
            }
        }
    })),

    setGroomAndBrideInfo: ( groomAndBrideInfo ) => set((state) => ({
        groomAndBrideInfo: {
            info: {
                groom: {
                    ...state.groomAndBrideInfo.info.groom,
                    ...groomAndBrideInfo.info?.groom
                },
                bride: {
                    ...state.groomAndBrideInfo.info.bride,
                    ...groomAndBrideInfo.info?.bride
                },
            },
            style: {
                ...state.groomAndBrideInfo.style,
                ...groomAndBrideInfo.style
            }
        }
    })),

    setGallery: ( gallery ) => set((state) => ({
        gallery: {
            info: {
                ...state.gallery.info,
                ...gallery.info
            },
            style: {
                ...state.gallery.style,
                ...gallery.style
            }
        }
    })),

    setQuote: ( quote ) => set((state) => ({
        quote: {
            info: {
                ...state.quote.info,
                ...quote.info
            },
            style: {
                ...state.quote.style,
                ...quote.style
            }
        }
    })),

    setLocation: ( location ) => set((state) => ({
        location: {
            info: {
                ...state.location.info,      // 기존 값
                ...location.info            // 전달받은 대체 값
            }
        }
    })),
    
    setDDay: ( dDay ) => set((state) => ({
        dDay: {
            info: {
                ...state.dDay.info,
                ...dDay.info,
            },
            style: {
                ...state.dDay.style,
                ...dDay.style,
            }
        }
    })),

    setGuestBook: ( guestBook ) => set((state) => ({
        guestBook: {
            info: {
                ...state.guestBook.info,
                ...guestBook.info,
            },
            style: {
                ...state.guestBook.style,
                ...guestBook.style,
            }
        }
    })),

    setInterview: ( interview ) => set((state) => ({
        interview: {
            info: {
                title: state.interview.info.title,
                qna: interview.info?.qna ?? state.interview.info.qna
            },
            style: {
                ...state.interview.style,
                ...interview.style
            }
        }
    })),

    setProfile: ( profile ) => set((state) => ({
        profile: {
            info: {
                groom: {
                    ...state.profile.info.groom,
                    ...profile.info?.groom
                },
                bride: {
                    ...state.profile.info.bride,
                    ...profile.info?.bride
                },
            },
            style: {
                ...state.profile.style,
                ...profile.style
            },
        }
    })),

    setTraffic: ( traffic ) => set((state) => ({
        traffic: {
            info: {
                bus: {
                    ...state.traffic.info.bus,
                    ...traffic.info?.bus
                },
                subway: {
                    ...state.traffic.info.subway,
                    ...traffic.info?.subway
                },
                etc: {
                    ...state.traffic.info.etc,
                    ...traffic.info?.etc
                }
            },
            style: {
                ...state.traffic.style,
                ...traffic.style
            }
        }
    })),

    setFlower: (( flower ) => set((state) => ({
        flower: {
            info: {
                ...state.flower.info,
                ...flower.info,
            },
            style: {
                ...state.flower.style,
                ...flower.style,
            }
        }
    }))),

    setIntro: (( intro ) => set((state) => ({
        intro: {
            info: {
                ...state.intro.info,
                ...intro.info,
            },
            style: {
                ...state.intro.style,
                ...intro.style,
            }
        }
    }))),

    setShare: (( share ) => set((state) => ({
        share: {
            info: {
                ...state.share.info,
                ...share.info,
            }
        }
    }))),

    setCommon: (( common ) => set((state) => ({
        common: {
            default: {
                ...state.common.default,
                ...common.default
            },
            info: {
                ...state.common.info,
                ...common.info,
            },
            function: {
                ...state.common.function,
                ...common.function,
            },
            style: {
                ...state.common.style,
                ...common.style,
            }
        }
    }))),

    // setAll: (( all ) => set((state) => all))
    setConfig: (args: any) => {
        set(() => ({
            config: args
        }))
    },

    resetConfig: () => {
        set(store.getInitialState())
    },

    // setDisplayOrder: ( displayOrder ) => set(( state ) => ({
    //     displayOrder: {
    //         ...state.displayOrder,    // 기존 modal 값들을 그대로 유지
    //         ...displayOrder,          // 전달된 modal 값만 덮어씀
    //     },
    // })),
    // setBottomSheet: ( bottomSheet ) => set(( state ) => ({
    //     bottomSheet: {
    //         ...state.bottomSheet,    // 기존 modal 값들을 그대로 유지
    //         ...bottomSheet,          // 전달된 modal 값만 덮어씀
    //     },
    // })),

    // (옵션) 나중에 필요할 경우 초기 상태를 다시 로딩하는 액션
    // initializeSettings: () => set({ settings: resetInitialSettings() }),

    // getSettings: ( data: any ) => set(state => ( state.settings = data )),
}));