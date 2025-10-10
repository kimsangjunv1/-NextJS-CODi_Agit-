"use client"

import ReactDOM from "react-dom";
import { Fragment, ReactNode } from 'react';

const Portal = ({ portal = true, children }: { portal?: boolean, children: ReactNode }) => {
    return portal ? (
        ReactDOM.createPortal(
            <Fragment>
                { children }
            </Fragment>
            ,document.body
        )) : (
            <Fragment>
                { children }
            </Fragment>
        )
};

export default Portal;
