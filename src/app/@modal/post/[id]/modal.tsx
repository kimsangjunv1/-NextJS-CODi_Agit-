// app/@modal/(.)photos/[id]/modal.tsx

'use client';

import ReactDOM from "react-dom";
import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 bg-red-500 modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} className="close-button" />
      </dialog>
    </div>
    ,document.body
  );
}
