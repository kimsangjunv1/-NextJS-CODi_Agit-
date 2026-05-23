'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

function GlobalErrorFallback({ error }: { error: Error }) {
    return (
        <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-4 p-8">
            <p className="text-[1.8rem] font-bold">문제가 발생했습니다.</p>
            <p className="text-[1.4rem] text-[#00000090]">{error.message}</p>
        </div>
    );
}

export default function GlobalErrorBoundary({ children }: { children: ReactNode }) {
    return <ErrorBoundary FallbackComponent={GlobalErrorFallback}>{children}</ErrorBoundary>;
}
