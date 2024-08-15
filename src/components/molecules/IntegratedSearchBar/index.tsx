import SearchBar from "@/components/atoms/SearchBar";
import SearchBarPopup from "@/components/atoms/SearchBarPopup";
import SearchBarPopupContent from "@/components/organisms/SearchBarPopupContent";
import { useRef } from "react";
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

    return (
        <Wrapper>
            <SearchBarPopup
                extraProps={{
                    onCreate: (instance) => (mainInstance.current = instance),
                }}
                content={
                    <SearchBarPopupContent
                        searchResult={searchResult}
                        width={bounds.width}
                        isLoading={isLoading}
                    />
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
        </Wrapper>
    );
}
