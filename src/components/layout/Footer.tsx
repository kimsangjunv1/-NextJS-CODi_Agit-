"use client"

import useNavigate from "@/hooks/common/useNavigate";

const Footer = () => {
    const { currentPathName } = useNavigate();

    // const RENDERING = currentPathName === "/" || currentPathName === "/profile"

    // if ( !RENDERING ) return;

    return (
        <footer className="fixed bottom-[1.6rem] right-[1.6rem] z-1">
            <div className="flex flex-col items-end footer-inner">
                {/* <p className="text-black">© 2025 CODI</p>
                <p className="text-black">2025.07.20</p> */}
            </div>
        </footer>
    )
}

export default Footer