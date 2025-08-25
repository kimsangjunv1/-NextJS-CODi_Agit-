"use client";

import { useEffect, useState } from "react";

import { deleteJWT } from "@/services/jwt/request.api";
import { useModalStore } from "@/stores/useModalStore";

import useNavigate from "@/hooks/common/useNavigate";
import { useJWTGetQuery } from "@/hooks/api/useJWTQuery";
import { useJWTValidationQuery } from "@/hooks/api/useJWTQuery";

const TokenExpiredComponent = ({ token }: { token: string }) => {
    const [ currentToken, setCurrentToken ] = useState("");

    const { setModal } = useModalStore();
    const { replaceToUrl, currentPathName } = useNavigate();

    const { data: jwtGetData, isLoading: jwtGetLoading, refetch: jwtGetFetch } = useJWTGetQuery();
    const { data: validationData, refetch: validationFetch } = useJWTValidationQuery(currentToken);
    
    // 모달: 토큰 만료 안내 세팅
    const setPreventModal = () => {
        setModal({
            type: "CHECK",
            title: "로그인 정보가 만료되었습니다.",
            description: "아래 확인을 누르시면 앱카드 인증으로 이동됩니다.",
            cancel: { text: " ", },
            confirm: {
                text: "앱카드 인증하기",
                onClick: async () => {
                    await deleteJWT();
                    const REDIRECT_URL = `https://nfc.enjoysoft.net/certification?returnUrl=${ process.env.NEXT_PUBLIC_DEV_URL }/check`;

                    replaceToUrl(`https://nfc.enjoysoft.net/certification?returnUrl=http://${ REDIRECT_URL }/check`);
                }
            },
            isOpen: true
        })
    };

    const setJWTValue = () => {
        if ( !currentToken ) {
            jwtGetFetch();
        }
    }

    // 함수: JWT 토큰 확인 후 currentToken state 업데이트
    const checkJWTToken = ( response: any ) => {
        const IS_SET_JWT_TOKEN = response.state;

        if ( IS_SET_JWT_TOKEN ){
            setCurrentToken( response.token.value )
        }
    }

    // 함수: 토큰이 있고, 현재 랜딩페이지일 경우 JWT 토큰 validation 체크
    const checkValidation = () => {
        validationFetch();
    }

    // 함수: 만료여부 체크
    const checkExpired = ( response: any ) => {
        const VALIDATE_STATE_IS_EXPIRED = !response.state;
        
        if ( VALIDATE_STATE_IS_EXPIRED ) {
            setPreventModal()
            console.log("********** 토큰 만료됨 **********")
            console.log("********** 토큰 만료됨 **********")
            console.log("********** 토큰 만료됨 **********")
            console.log("********** 토큰 만료됨 **********")
            console.log("********** 토큰 만료됨 **********")
        }
    }

    useEffect(() => { setJWTValue() }, [ currentPathName ]);
    
    useEffect(() => { 
        if ( jwtGetData ) {
            checkJWTToken( jwtGetData )
        }
    }, [ jwtGetData ]);

    useEffect(() => { 
        if ( currentToken ) {
            checkValidation()
        }
    }, [ currentToken ]);

    useEffect(() => { 
        if ( validationData ) {
            checkExpired( validationData )
        } 
    }, [ validationData, currentPathName ]);

    return <></>
}

export default TokenExpiredComponent