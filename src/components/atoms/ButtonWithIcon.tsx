import styled from "styled-components";

export const ButtonWithIcon = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.75rem;
    gap: 0.5rem;
    border-radius: 0.75rem;

    background: rgba(238, 238, 238, 0.2);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);

    color: #eee;
    font-size: 1rem;
    font-weight: 600;

    svg {
        width: 1.25rem;
        height: 1.25rem;
        fill: #eee;
    }

    transition: all ease-in-out 0.2s;

    svg {
        transition: all ease-in-out 0.2s;
    }

    &:hover {
        backdrop-filter: blur(12px);
        background: rgba(238, 238, 238, 0.32);
        box-shadow: 0px 0px 12px 0px rgba(82, 82, 82, 0.4);
        text-shadow: 0px 0px 20px rgba(0,0,0, 0.7);

        svg {
            filter: drop-shadow(0px 0px 20px rgba(0,0,0, 0.7));
        }

        transform: scale(1.03);
    }

    &:active {
        transform: scale(.97);
        backdrop-filter: blur(14px);
        background: rgba(184, 184, 184, 0.32);
    }
`;
