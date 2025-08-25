"use client"

import useNavigate from "@/hooks/common/useNavigate";

const Footer = () => {
    const { currentPathName } = useNavigate();

    const RENDERING = currentPathName === "/" || currentPathName === "/profile"

    if ( !RENDERING ) return;

    return (
        <footer>
            <div className="footer-inner">
                <p>© 2025 CODI | 2025.07.20</p>
            </div>
        </footer>
    )
}

export default Footer