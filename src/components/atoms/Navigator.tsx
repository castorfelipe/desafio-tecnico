import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 0.75rem;
    padding: 0 .75rem;
    justify-content: flex-end;
    width: 100%;

    p {
        color: #eee;
        font-size: 1rem;
        font-weight: 400;
    }

    .buttons-wrapper {
        display: flex;
        gap: 1.5rem;
    }
    button {
        svg {
            width: 1.5rem;
            height: 1.5rem;
            color: #eee;
        }

        &:disabled svg {
            color: #6e6e6e;
        }
    }
`;

export default function Navigator({
    currentPage,
    pagesTotal,
    onLeft,
    onRight
}: {
    currentPage: number;
    pagesTotal: number;
    onLeft: () => void,
    onRight: () => void
}) {
    return (
        <Container>
            <p>
                {currentPage}
                {" de "}
                {pagesTotal} páginas
            </p>

            <div className="buttons-wrapper">
                <button
                    onClick={onLeft}
                    disabled={currentPage === 1}
                >
                    <LuChevronLeft />
                </button>
                <button
                    onClick={onRight}
                    disabled={currentPage === pagesTotal}
                >
                    <LuChevronRight />
                </button>
            </div>
        </Container>
    );
}
