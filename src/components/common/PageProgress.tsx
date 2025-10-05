"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

import "nprogress/nprogress.css";

const PageProgress = () => {
	const pathname = usePathname();
	// const searchParams = useSearchParams();

	useEffect(() => {
		NProgress.done();
	}, [ pathname ]);

	return null;
}

export default PageProgress