import styled from "styled-components";

const MarkedTitle = styled.h2`
    position: relative;
    color: #eee;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.8rem;
    padding-left: 0.75rem;

    &::before {
        position: absolute;
        content: "";
        inset: 0;

        height: 100%;
        width: 0.25rem;
        background: #eee;
        border-radius: 0.56rem;
    }
`;

export default MarkedTitle