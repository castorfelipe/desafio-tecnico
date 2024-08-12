import IntegratedSearchBar from "@/components/molecules/IntegratedSearchBar";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RaterLogo from "@/assets/rater-logo.svg?react";
import tmdb from "@/services/tmdb";
import { MultiSearchResult } from "tmdb-ts";
import { useNavigate } from "react-router-dom";

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

    a {
        cursor: pointer;
    }
`;

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [searchResult, setSearchResult] = useState<
        MultiSearchResult[] | null
    >(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const navigateTo = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const searchResponse = await tmdb.search.multi({
            language: "pt-BR",
            include_adult: true,
            query: searchTerm!,
        });

        setSearchResult(searchResponse.results);
        setLoading(false);
    };

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        if (!searchTerm) return;
        setLoading(true);
        timeoutRef.current = setTimeout(handleSearch, 1000);
        return () => {
            clearTimeout(timeoutRef.current);
            setLoading(false);
        };
    }, [searchTerm]);

    return (
        <Container>
            <a onClick={() => navigateTo("/")}>
                <RaterLogo />
            </a>
            <IntegratedSearchBar
                onTextChange={setSearchTerm}
                onSearchClicked={handleSearch}
                searchResult={searchResult}
                isLoading={isLoading}
            />
            <RaterLogo className="invisible" />
        </Container>
    );
}
