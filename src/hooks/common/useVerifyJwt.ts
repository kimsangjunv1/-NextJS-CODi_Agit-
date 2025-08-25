import { useJWTValidationQuery } from "@/hooks/api/useJWTQuery";


// ***
// 로컬 스토리지에서 JWT token을 가져와
// 그 JWT를 가지고 useJWTValidationQuery을 통해 verify관련 api 호출한뒤
// 응답 중 phoneNo를 useUserInfoQuery에 인자로 넣어 호출하여
// 사용자 정보를 조회하는 프로세스
// ***


const useVerifyJwt = (token: string) => {
    const { data: verifyData, isLoading: verifyLoading } = useJWTValidationQuery(token);

    const checkVerifyData = ( response: any ) => {
        if ( response ) {
            const { body } = response;
            return body ? body : {}
        }
    }

    const data = checkVerifyData( verifyData );

    return { data, verifyLoading };
};

export default useVerifyJwt;