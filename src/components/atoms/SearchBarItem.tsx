import { Cover } from "@/components/atoms/Cover";
import { MovieItemRating } from "@/components/molecules/MovieItem/styles";
import useOnScreen from "@/hooks/useOnScreen";
import tmdb from "@/services/tmdb";
import animations from "@/utils/animations";
import {
    calculateAge,
    getMultiSearchData
} from "@/utils/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LuStar, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MultiSearchResult, PersonDetails } from "tmdb-ts";

const Container = styled(motion.div)`
    display: flex;
    height: fit-content;
    min-height: 5.875rem;
    padding: 0.25rem;
    border-radius: 1rem;
    cursor: pointer;
    gap: 0.5rem;
    color: #eee;
    transition: background-color 0.1s ease-in;

    img,
    .cover-replacer {
        border-radius: 0.75rem;
        border: 2px solid var(--colors-secondary-borders-6, #3a3a3a);
        background-color: #3a3a3a;
        height: 5.4rem;
        min-width: fit-content;
        aspect-ratio: 1280/1920;
    }

    .cover-replacer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5.4rem;
        aspect-ratio: 1280/1920;
        border: none;
        background-color: #242424;
        svg {
            width: 2rem;
            height: 2rem;
            color: #eee;
        }
    }

    .row {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .title {
            font-size: 0.75rem;
            font-weight: 500;
        }
    }

    .column {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 0.5rem;
    }

    .rating {
        background: none;

        font-size: 0.75rem;
        font-weight: 600;
        line-height: 0.75rem;

        svg {
            width: 0.875rem;
            height: 0.875rem;
        }
    }

    .description-item {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        color: #b4b4b4;
        text-overflow: ellipsis;
        font-size: 0.8125rem;
        font-weight: 500;
    }

    &:hover {
        background-color: #3a3a3a;
    }

    p.title {
        display: -webkit-box;
        color: #fff;
        font-size: 0.875rem;
        font-weight: 600;

        span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            color: #b4b4b4;
            text-overflow: ellipsis;

            font-size: 0.75rem;
            font-weight: 500;
            line-height: 0.75rem;
            margin-left: 0.25rem;
        }
    }
`;

export default function SearchBarItem({
    searchItem,
    index,
}: {
    searchItem: MultiSearchResult;
    index: number;
}) {
    const ref = useRef(null);
    const isOnScreen = useOnScreen(ref);
    const navigateTo = useNavigate();

    const [details, setDetails] = useState<PersonDetails>();
    const { title, coverPath, rating, description, relased_year } =
        getMultiSearchData(searchItem);

    const handleFetchDetails = async () => {
        if (searchItem.media_type !== "person") return;
        const detailsResponse = await tmdb.people.details(searchItem.id);
        setDetails(detailsResponse);
    };

    const handleRedirect = () => {
        if (searchItem.media_type === "person")
            return navigateTo({ pathname: `/actor/${searchItem.id}` });
        return navigateTo({ pathname: `/movie/${searchItem.id}` });
    };

    useEffect(() => {
        if (!isOnScreen) return;
        if (details) return;
        handleFetchDetails();
    }, [isOnScreen]);

    return (
        <Container
            ref={ref}
            onClick={handleRedirect}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {coverPath && (
                <Cover
                    posterPath={coverPath}
                    $posterType={
                        searchItem.media_type === "person" ? "person" : "movie"
                    }
                />
            )}

            {!coverPath && (
                <div className="cover-replacer">
                    <LuUser />
                </div>
            )}

            <div className="column">
                <div className="row">
                    <p className="title">
                        {title}
                        <AnimatePresence>
                            {details && (
                                <motion.span
                                    className="age"
                                    {...animations.fadeInOut(0.3)}
                                >
                                    {calculateAge(
                                        details.birthday,
                                        details.deathday,
                                    )}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </p>
                    {rating !== undefined && rating > 0 && (
                        <MovieItemRating className="rating">
                            <LuStar /> {rating.toFixed(1)}
                        </MovieItemRating>
                    )}
                </div>
                <div className="column description">
                    {relased_year && (
                        <div className="description-item">{relased_year}</div>
                    )}

                    {description && (
                        <div className="description-item">{description}</div>
                    )}
                </div>
            </div>
        </Container>
    );
}
