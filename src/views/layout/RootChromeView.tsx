import { ReactNode } from "react";

import { RootChromePanel } from "@/widgets/layout";

type RootChromeViewProps = {
    children: ReactNode;
};

export default function RootChromeView({ children }: RootChromeViewProps) {
    return <RootChromePanel>{children}</RootChromePanel>;
}
