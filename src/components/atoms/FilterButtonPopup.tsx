import Tippy, { TippyProps } from "@tippyjs/react";
import { ReactElement, ReactNode } from "react";
import "tippy.js/animations/shift-away.css";

export default function FilterButtonPopup({
    children,
    contentBottom,
    extraProps
    // contentRight,
}: {
    children: ReactElement;
    contentBottom: ReactNode;
    extraProps?: TippyProps
    // contentRight: ReactNode;
}) {
    return (
        <Tippy
            content={contentBottom}
            // visible={true}
            interactive={true}
            hideOnClick={false}
            trigger="click"
            onClickOutside={(instance) => instance.hide()}
            // maxWidth={width}
            placement="bottom-start"
            animation="shift-away"
            {...extraProps}
        >
            {children}
        </Tippy>
    );
}
