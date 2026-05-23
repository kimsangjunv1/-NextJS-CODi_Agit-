"use client";

import { InvitationManagerPageProvider } from "@/widgets/manager/invitation/model/InvitationManagerContext";

import * as InvitationManagerLayer from "@/widgets/manager/invitation/ui";

export default function Panel() {
    return (
        <InvitationManagerPageProvider>
            <InvitationManagerLayer.InvitationManager />
        </InvitationManagerPageProvider>
    );
}
