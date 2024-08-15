import {
    formatShortWeekday,
    ReactCalendarWrapper,
} from "@/components/atoms/CalendarButton";
import { RoundButton } from "@/components/atoms/RoundButton";
import SearchBar from "@/components/atoms/SearchBar";
import SearchBarPopup from "@/components/atoms/SearchBarPopup";
import FilterButtonPopupContent from "@/components/organisms/FilterButtonPopupContent";
import SearchBarPopupContent from "@/components/organisms/SearchBarPopupContent";
import Tippy from "@tippyjs/react";
import { useRef, useState } from "react";
import Calendar from "react-calendar";
import {
    LuChevronLeft,
    LuChevronRight,
    LuSlidersHorizontal,
} from "react-icons/lu";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import type { Instance } from "tippy.js";
import { MultiSearchResult } from "tmdb-ts";

const Wrapper = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    max-width: 30rem;

    justify-content: stretch;

    .measure-wrapper {
        width: 100%;
    }

    .filter-button {
        transition: 0.1s;
        &:hover {
            background-color: #252525;
        }
    }
`;

export default function IntegratedSearchBar({
    onTextChange,
    onSearchClicked,
    searchResult,
    isLoading,
}: {
    onTextChange: (d: string) => void;
    onSearchClicked: () => void;
    searchResult: MultiSearchResult[] | null;
    isLoading: boolean;
}) {
    const [ref, bounds] = useMeasure();
    const externalRef = useRef<HTMLDivElement | null>(null);
    const mainInstance = useRef<Instance | null>(null);
    const [isFilterOpen, setFilterOpen] = useState(true);
    const [parentRef, parentBounds] = useMeasure();
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [currentActiveDate, setActiveDate] = useState<number | null>(null);
    const [isCalendarOpen, setCalendarOpen] = useState(false);

    const handleFilterClick = () => {
        setFilterOpen((e) => !e);
        mainInstance.current?.show();
        console.log("Mostrei", mainInstance.current);
    };

    console.log(parentBounds);

    const handleCalendarClick = (id: number) => {
        setCalendarOpen(true);
        setActiveDate(id);
    };

    const setDate = currentActiveDate === 1 ? setDate1 : setDate2;
    const date = currentActiveDate === 1 ? date1 : date2;

    return (
        <Tippy
            content={
                <ReactCalendarWrapper>
                    <Calendar
                        onChange={(d) => setDate(d as any)}
                        value={date}
                        locale="pt"
                        minDetail="year"
                        formatShortWeekday={formatShortWeekday}
                        calendarType="hebrew"
                        prevLabel={<LuChevronLeft />}
                        nextLabel={<LuChevronRight />}
                    />
                </ReactCalendarWrapper>
            }
            placement="right-end"
            interactive={true}
            animation="shift-away"
            visible={isCalendarOpen && isFilterOpen}
        >
            <Wrapper ref={parentRef}>
                <SearchBarPopup
                    extraProps={{
                        onCreate: (instance) =>
                            (mainInstance.current = instance),
                        onHide: () => setCalendarOpen(false),
                    }}
                    content={
                        isFilterOpen ? (
                            <FilterButtonPopupContent
                                width={parentBounds.width}
                                date1={date1}
                                date2={date2}
                                onCalendarClicked={handleCalendarClick}
                            />
                        ) : (
                            <SearchBarPopupContent
                                searchResult={searchResult}
                                width={bounds.width}
                                isLoading={isLoading}
                            />
                        )
                    }
                >
                    <div
                        ref={(r) => {
                            externalRef.current = r;
                            ref(r);
                        }}
                        className="measure-wrapper"
                    >
                        {bounds.width > 0 && (
                            <SearchBar
                                onTextChange={onTextChange}
                                onSearchClicked={onSearchClicked}
                            />
                        )}
                    </div>
                </SearchBarPopup>

                <RoundButton
                    className="filter-button"
                    onClick={() => {
                        handleFilterClick();
                    }}
                >
                    <LuSlidersHorizontal />
                </RoundButton>
            </Wrapper>
        </Tippy>
    );
}
