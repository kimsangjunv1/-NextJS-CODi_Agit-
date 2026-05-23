export const TEST_PAYLOAD = [
    {
        type: 0,                                                                        // 태그 종류 0: div, 1: p, 2: span, 3: section 등등..
        order: 0,                                                                       // 순서
        value: "안녕하세요\n오늘은 앞으로 어떻게 할건지 알아볼건데요\n어떻게 생각하시는지 말씀 좀 해주세요",   // 내용
        attribute: {
            text: [0, 4],   // 0: underLine, 4: font-bold
            size: 20
        }
    },
    {
        type: 5,                                                                        // 태그 종류 0: div, 1: p, 2: span, 3: section, 4: h2, 5, h3 등등..
        order: 1,                                                                       // 순서
        value: "챕터 1",   // 내용
        attribute: {
            text: [0, 4],   // 0: underLine, 4: font-bold
            size: 20
        }
    },
]