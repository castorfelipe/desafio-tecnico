import "react-calendar/dist/Calendar.css";
import type { ButtonProps } from "react-html-props";
import { LuCalendar } from "react-icons/lu";
import styled from "styled-components";

export const Container = styled.button`
    display: flex;
    height: 3rem;
    padding: 0.75rem;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.75rem;
    background: #232323;

    color: #b4b4b4;
    font-size: 0.875rem;
    font-weight: 400;

    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #eeeeee;
    }
`;

export const ReactCalendarWrapper = styled.div`
    .react-calendar {
        border-radius: 1.5rem;
        background-color: #191919;
        color: #eee;
        width: 17.5rem;
        border: none;
        display: flex;
        flex-direction: column;
        padding: 1.75rem 0.75rem;

        .react-calendar__tile {
            border-radius: 0.375rem;
            padding: 0.25rem 0.5rem !important;
            min-width: 1rem;

            abbr {
                color: #eee;
                font-size: 1rem;
                font-weight: 600;
                line-height: 1.2rem;
            }

            &:hover {
                background-color: #2a2a2a;
            }
        }

        button {
            min-width: fit-content;
        }

        .react-calendar__month-view__days__day--neighboringMonth {
            color: #313131;
            abbr {
                color: #313131;
            }
        }

        .react-calendar__navigation {
            position: relative;
            margin-bottom: 0.375rem;
            padding: 0.75rem;
            padding-top: 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1.5rem;
            height: fit-content;

            button {
                transition: 0.2s;
            }

            .react-calendar__navigation__label__labelText {
                color: #eee;
                font-size: 1rem;
                font-weight: 600;
                line-height: 1.2rem;
                padding-right: auto;
            }

            .react-calendar__navigation__prev2-button,
            .react-calendar__navigation__next2-button {
                display: none;
            }

            .react-calendar__navigation__next-button,
            .react-calendar__navigation__prev-button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: fit-content;
                order: 2;
                padding: 0.25rem;
                border-radius: 50%;

                svg {
                    width: 1rem;
                    height: 1rem;
                    color: #eee;
                    stroke-width: 3;
                }

                &:hover {
                    background-color: #2a2a2a;
                    transform: scale(1.1);
                }

                &:focus {
                    background: none;
                }
            }

            &::after {
                position: absolute;
                content: "";
                width: calc(100% - 1.5rem);
                height: 0.125rem;
                background-color: #3a3a3a;
                bottom: 0;
                left: 0.75rem;
            }
        }
        .react-calendar__month-view__weekdays {
            abbr {
                text-decoration: none;
                color: #eee;
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.2rem;
            }
        }

        .react-calendar__navigation__label {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: fit-content;
            width: fit-content;
            flex-grow: 0 !important;
            margin-right: auto;
            background: none !important;
        }
    }
`;

export const formatShortWeekday = (_: unknown, date: Date): string => {
    const fullWeekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    return fullWeekdays[date.getDay()];
};


export default function CalendarButton({ onClick, date }: ButtonProps & { date: Date }) {

    return (
        <Container onClick={onClick}>
            {date!.toISOString().split("T")[0]}
            <LuCalendar />
        </Container>
    );
}
