import Tippy from "@tippyjs/react";
import { ReactElement, ReactNode } from "react";
import "tippy.js/animations/shift-away.css";

export default function SearchBarPopup({
    children,
    content,
}: {
    children: ReactElement;
    content: ReactNode;
}) {
    return (
        <Tippy
            content={content}
            // visible={true}
            interactive={true}
            hideOnClick={false}
            trigger="click"
            onClickOutside={(instance) => instance.hide()}
            // maxWidth={width}
            placement="bottom-start"
            animation="shift-away"
        >
            {children}
        </Tippy>
    );
}
