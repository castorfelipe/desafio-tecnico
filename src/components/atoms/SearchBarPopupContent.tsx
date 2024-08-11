import SearchBarItem from "@/components/atoms/SearchBarItem";
import styled from "styled-components";
import { MultiSearchResult } from "tmdb-ts";

const Container = styled.div`
    background-color: #191919;
    padding: 0.75rem;
    width: 100%;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 25rem;

    .itens-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
    }

    .results-title {
        color: #eee;
        font-size: 0.75rem;
        font-weight: 500;
        padding-left: 0.25rem;
    }
`;

export default function SearchBarPopupContent({
    width,
    searchResult,
}: {
    width: number;
    searchResult: MultiSearchResult[] | null;
}) {
    return (
        <>
            {searchResult && (
                <Container style={{ width }}>
                    <p className="results-title">
                        {searchResult?.length || 0} Resultados:
                    </p>
                    <div className="itens-wrapper">
                        {searchResult.map((searchItem) => (
                            <SearchBarItem
                                key={searchItem.id}
                                searchItem={searchItem}
                            />
                        ))}
                    </div>
                </Container>
            )}
        </>
    );
}
