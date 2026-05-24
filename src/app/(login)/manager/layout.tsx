import { ReactNode } from "react";

import ManagerLayoutShell from "@/widgets/manager/ui/ManagerLayoutShell";

export default function ManagerLayout({ children }: { children: ReactNode }) {
    return <ManagerLayoutShell>{children}</ManagerLayoutShell>;
}
