import MarkedTitle from "@/components/atoms/MarkedTitle";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    /* padding: 1.5rem; */

    .scroll-wrapper {
        display: flex;
        flex-grow: 1;
        height: 100%;
        gap: 0.75rem;
        overflow-x: auto;
    }

    .row {
        display: flex;
        justify-content: space-between;

    }

    .buttons-wrapper {
        display: flex;
        gap: 1.5rem;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #EEEEEE;
            svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            &:disabled {
                color: #6E6E6E;
            }
        }
    }
`;

export default function CarouselSection({
    children,
    title,
}: {
    children: ReactNode[];
    title: string;
}) {
    return (
        <Container>
            <div className="row">
                <MarkedTitle className="carousel-title">{title}</MarkedTitle>
                <div className="buttons-wrapper">
                    <button disabled>
                        <LuChevronLeft />
                    </button>
                    <button>
                        <LuChevronRight />
                    </button>
                </div>
            </div>
            <motion.div className="scroll-wrapper">
                {children.map((child) => child)}
            </motion.div>
        </Container>
    );
}
