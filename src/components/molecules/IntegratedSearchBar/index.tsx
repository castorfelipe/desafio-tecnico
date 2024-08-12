import { RoundButton } from "@/components/atoms/RoundButton";
import SearchBar from "@/components/atoms/SearchBar";
import SearchBarPopup from "@/components/atoms/SearchBarPopup";
import SearchBarPopupContent from "@/components/atoms/SearchBarPopupContent";
import { LuSlidersHorizontal } from "react-icons/lu";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import { MultiSearchResult } from "tmdb-ts";

const Wrapper = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    max-width: 30rem;

    justify-content: stretch;

    .measure-wrapper {
        width: 100%;
        /* background-color: red; */
    }
`;

export default function IntegratedSearchBar({
    onTextChange,
    onSearchClicked,
    searchResult,
    isLoading
}: {
    onTextChange: (d: string) => void;
    onSearchClicked: () => void;
    searchResult: MultiSearchResult[] | null;
    isLoading: boolean
}) {
    const [ref, bounds] = useMeasure();
    return (
        <Wrapper>
            <SearchBarPopup
                content={
                    <SearchBarPopupContent
                        searchResult={searchResult}
                        width={bounds.width}
                        isLoading={isLoading}
                    />
                }
            >
                <div ref={ref} className="measure-wrapper">
                    {bounds.width > 0 && (
                        <SearchBar
                            onTextChange={onTextChange}
                            onSearchClicked={onSearchClicked}
                        />
                    )}
                </div>
            </SearchBarPopup>

            <RoundButton className="filter-button">
                <LuSlidersHorizontal />
            </RoundButton>
        </Wrapper>
    );
}
