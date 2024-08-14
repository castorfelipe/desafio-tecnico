import { LoadingSmall } from "@/components/atoms/Loading";
import SearchBarItem from "@/components/atoms/SearchBarItem";
import animations from "@/utils/animations";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { MultiSearchResult } from "tmdb-ts";

const Container = styled(motion.div)`
    position: relative;
    background-color: #191919;
    padding: 0.75rem;
    width: 100%;
    border-radius: 1.5rem;
    max-height: 25rem;
    min-height: 5rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;

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
    isLoading,
}: {
    width: number;
    searchResult: MultiSearchResult[] | null;
    isLoading: boolean;
}) {
    const shouldShow = isLoading || Boolean(searchResult);

    return (
        <AnimatePresence>
            {shouldShow && (
                <Container style={{ width }}>
                    <AnimatePresence>
                        {Boolean(searchResult) && (
                            <>
                                <p className="results-title">
                                    {searchResult?.length || 0} Resultados:
                                </p>
                                <div className="itens-wrapper">
                                    {searchResult!.map((searchItem, index) => (
                                        <SearchBarItem
                                            key={searchItem.id}
                                            searchItem={searchItem}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </AnimatePresence>
                    <AnimatePresence key={2}>
                        {isLoading && <LoadingSmall size={2} />}
                    </AnimatePresence>
                </Container>
            )}
        </AnimatePresence>
    );
}
