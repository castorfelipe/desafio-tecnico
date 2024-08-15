import CalendarButton from "@/components/atoms/CalendarButton";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    border-radius: 1.5rem;
    background: #191919;
    /* background-color: red; */

    display: flex;
    padding: 0.75rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.75rem;
    color: #eee;

    p {
        color: #eee;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .genres-filter {
        display: flex;
        flex-direction: column;

        gap: 0.5rem;
    }

    .buttons-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.28125rem 0.75rem;
            border-radius: 6.1875rem;
            border: 2px solid #313131;

            color: #eee;
            font-size: 0.75rem;
            font-weight: 400;
        }
    }

    .bottom-inputs {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;

        .inputs-wrapper {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            > button {
                flex-grow: 1;
            }

            p {
                font-size: 0.875rem;
            }
        }
    }
`;

export default function FilterButtonPopupContent({
    width,
    date1,
    date2,
    onCalendarClicked,
}: {
    width: number;
    date1: Date;
    date2: Date;
    onCalendarClicked: (d: number) => void;
}) {
    return (
        <Container style={{ width }}>
            <div className="genres-filter">
                <p>Gêneros cinematográficos</p>
                <div className="buttons-wrapper">
                    <button>Ação</button>
                    <button>Aventura</button>
                    <button>Ficção científica</button>
                    <button>Comédia</button>
                    <button>Terror</button>
                    <button>Romance</button>
                </div>
            </div>
            <div className="divider" />
            <div className="bottom-inputs">
                <p>Data de lançamento</p>
                <div className="inputs-wrapper">
                    <CalendarButton
                        date={date1}
                        onClick={() => onCalendarClicked(1)}
                    />
                    <p>a</p>
                    <CalendarButton
                        date={date2}
                        onClick={() => onCalendarClicked(2)}
                    />
                </div>
            </div>
        </Container>
    );
}
