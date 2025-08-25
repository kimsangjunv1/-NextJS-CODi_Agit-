// "use client"

// import { ToastContainer, Slide } from "react-toastify";

// import IconComponent from "@/components/common/IconComponent";

// const Toast = () => {
//   return (
//     <ToastContainer
//         className="z-[10000000]"
//         hideProgressBar
//         draggable
//         position="bottom-center"
//         // position={`${ isDevice ? "bottom-center" : "top-center" }`}
//         theme="dark"
//         closeButton={ false }
//         autoClose={ 1000 }
//         transition={ Slide }
//         limit={ 4 } // 알람 개수 제한
//         icon={({ type }) => {
//             if (type === "info") return <IconComponent type="colored-information" alt="현재 값" className="w-[3.2rem]" />;
//             if (type === "warning") return <IconComponent type="colored-warning" alt="현재 값" className="w-[3.2rem]" />;
//             if (type === "success") return <IconComponent type="colored-success" alt="현재 값" className="w-[3.2rem]" />;
//             if (type === "error") return <IconComponent type="colored-error" alt="현재 값" className="w-[3.2rem]" />;
//         }}
//     />
//   )
// }

// export default Toast