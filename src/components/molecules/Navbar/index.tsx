import IntegratedSearchBar from "@/components/molecules/IntegratedSearchBar";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RaterLogo from "../../../assets/rater-logo.svg";
import tmdb from "@/services/tmdb";
import { MultiSearchResult } from "tmdb-ts";

const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .invisible {
        opacity: 0;
    }

    .center-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 0.75rem;
    }
`;

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [searchResult, setSearchResult] = useState<
        MultiSearchResult[] | null
    >(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const handleSearch = async () => {
        const searchResponse = await tmdb.search.multi({
            language: "pt-BR",
            include_adult: true,
            query: searchTerm!,
        });

        setSearchResult(searchResponse.results);
    };

    console.log(searchResult);

    useEffect(() => {
        clearTimeout(timeoutRef.current)
        if(!searchTerm) return
        timeoutRef.current = setTimeout(handleSearch, 1000);
        return () => clearTimeout(timeoutRef.current);
    }, [searchTerm]);

    return (
        <Container>
            <img src={RaterLogo} />
            <IntegratedSearchBar
                onTextChange={setSearchTerm}
                onSearchClicked={handleSearch}
                searchResult={searchResult}
            />
            <img src={RaterLogo} className="invisible" />
        </Container>
    );
}
