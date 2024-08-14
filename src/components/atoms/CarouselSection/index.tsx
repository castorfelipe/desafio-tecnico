import MarkedTitle from "@/components/atoms/MarkedTitle";
import { ReactNode, useEffect, useRef, useState } from "react";
import Flickity from "react-flickity-component";
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
            color: #eeeeee;
            svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            &:disabled {
                color: #6e6e6e;
            }
        }
    }

    .carousel {
        > button,
        > ol {
            display: none;
        }

        outline: none !important;
        overflow: hidden;

        .flickity-slider > div {
            margin: 0 0.375rem !important;
            max-height: 24rem;
            overflow: hidden;
        }

        .flicity-slider {
            overflow: hidden;
        }

        .flickity-viewport {
            /* height: 20rem; */
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
    const flickityRef = useRef<Flickity | null>(null);

    const handleLeftClick = () => {
        (flickityRef.current as any).prevButton.element.click();
    };

    const handleRightClick = () => {
        (flickityRef.current as any).nextButton.element.click();
    };

    return (
        <Container>
            <div className="row">
                <MarkedTitle className="carousel-title">{title}</MarkedTitle>
                <div className="buttons-wrapper">
                    <button onClick={handleLeftClick}>
                        <LuChevronLeft />
                    </button>
                    <button onClick={handleRightClick}>
                        <LuChevronRight />
                    </button>
                </div>
            </div>
            <Flickity
                flickityRef={(r) => (flickityRef.current = r)}
                className="carousel"
                options={{
                    cellAlign: "left",
                    initialIndex: 0,
                    freeScroll: true,
                    wrapAround: false,
                    friction: 0.28,
                    adaptiveHeight: true,
                    setGallerySize: true,
                }}
                reloadOnUpdate={true}
            >
                {children.map((child, index) => (
                    <div key={index}>{child}</div>
                ))}
            </Flickity>
        </Container>
    );
}
