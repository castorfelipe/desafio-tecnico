import Tippy, { TippyProps } from "@tippyjs/react";
import { ReactElement, ReactNode } from "react";
import "tippy.js/animations/shift-away.css";

export default function SearchBarPopup({
    children,
    content,
    extraProps
}: {
    children: ReactElement;
    content: ReactNode;
    extraProps?: TippyProps
}) {
    return (
        <Tippy
            content={content}
            interactive={true}
            hideOnClick={false}
            trigger="click"
            placement="bottom-start"
            animation="shift-away"
            {...extraProps}
        >
            {children}
        </Tippy>
    );
}
