// "use client"

// import { Fragment, useEffect, useState } from "react";

// import useNavigate from "@/hooks/common/useNavigate";
// import useCheckScroll from "@/hooks/dom/useCheckScroll";

// import IconComponent from "@/components/common/IconComponent"

// import { useLayoutStore } from "@/stores/useLayoutStore";
// import { useServiceStore } from "@/stores/useServiceStore";

// const Navigation = () => {
//     const [ isNeedWhite, setIsNeedWhite ] = useState(false);

//     const { scrollTop } = useCheckScroll(true);
//     const { backToUrl, isLandingPage, currentPathName } = useNavigate();

//     const { persistNavTitle } = useServiceStore();
//     const { isNeedNavigation, setIsNeedNavigation } = useLayoutStore();
    
//     // 필수: path가 home인지에 따라 렌더링 여부 결정
//     useEffect(() => {
//         const IS_PATH_HOME = currentPathName === "/new-home" || currentPathName === "/appcard";
//         const SET_BG_WHITE = currentPathName === "/payment";
        
//         setIsNeedNavigation( !IS_PATH_HOME );
//         setIsNeedWhite( SET_BG_WHITE );
//     }, [ currentPathName ])

//     return (
//         <Fragment>
//             { isNeedNavigation ? (
//                 <nav id="nav">
//                     <div className={`relative nav-inner bg-[#f4f5f991] backdrop-blur-[20px]`}>
//                         {/* 뒤로가기 버튼 */}
//                         { !isLandingPage &&
//                             <button
//                                 className="bg-transparent"
//                                 onClick={ backToUrl }
//                                 data-testid="backward-current-url"
//                             >
//                                 <IconComponent type="arrow-left" alt="뒤로가기" className={`${ scrollTop > 1 || currentPathName !== "/home" ? "" : "brightness-[100%] invert"}`} />
//                             </button>
//                         }
//                         {/* 뒤로가기 버튼 END */}

//                         {/* 타이틀 */}
//                         <h1 className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
//                             { persistNavTitle }
//                         </h1>
//                         {/* 타이틀 END */}
//                     </div>
//                 </nav>
//             ) : ""}
//         </Fragment>
//     )
// }

// export default Navigation