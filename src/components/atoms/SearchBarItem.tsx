import { MovieItemRating } from "@/components/molecules/MovieItem/styles";
import tmdb from "@/components/services/tmdb";
import useOnScreen from "@/hooks/useOnScreen";
import animations from "@/utils/animations";
import { calculateAge, getTmdbPosterPathUrl } from "@/utils/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LuStar, LuUser } from "react-icons/lu";
import styled from "styled-components";
import { MultiSearchResult, PersonDetails } from "tmdb-ts";

const Container = styled.div`
    display: flex;
    height: fit-content;
    min-height: 5.875rem;
    padding: 0.25rem;
    border-radius: 1rem;
    cursor: pointer;
    gap: 0.5rem;
    color: #eee;
    transition: 0.1s ease-in;

    img,
    .cover-replacer {
        border-radius: 0.75rem;
        border: 2px solid var(--colors-secondary-borders-6, #3a3a3a);
        background-color: #3a3a3a;
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
        /* line-height: 0.9rem; */
    }

    &:hover {
        background-color: #3a3a3a;
    }

    p.title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;

        color: #fff;
        font-size: 0.875rem;
        font-weight: 600;

        span {
            color: #b4b4b4;
            text-overflow: ellipsis;
            font-size: 0.75rem;
            font-weight: 500;
            line-height: 0.75rem;
            margin-left: 0.25rem;
        }
    }
`;

const knownForNames: { [key: string]: string } = {
    Acting: "Ator",
    Directing: "Diretor",
    Production: "Produtor",
};

const getItemData = (item: MultiSearchResult) => {
    if (item.media_type === "movie") {
        return {
            title: item.title,
            coverPath: item.poster_path,
            rating: item.vote_average,
            description: item.overview,
        };
    }

    if (item.media_type === "tv") {
        return {
            title: item.name,
            coverPath: item.poster_path,
            rating: item.vote_average,
            description: item.overview,
        };
    }

    const role =
        knownForNames[item.known_for_department] || item.known_for_department;

    return {
        title: item.name,
        coverPath: item.profile_path,
        rating: null,
        description: `${role}: ${item.known_for
            .map((d) => {
                if (d.media_type === "movie") return d.title;
                return d.name;
            })
            .join(", ")}`,
    };
};

export default function SearchBarItem({
    searchItem,
}: {
    searchItem: MultiSearchResult;
}) {
    const ref = useRef(null);
    const isOnScreen = useOnScreen(ref);

    const year =
        "release_date" in searchItem && searchItem.release_date.split("-")[0];

    const [details, setDetails] = useState<PersonDetails>();
    const { title, coverPath, rating, description } = getItemData(searchItem);

    const handleFetchDetails = async () => {
        if (searchItem.media_type !== "person") return;
        const detailsResponse = await tmdb.people.details(searchItem.id);
        console.log(detailsResponse);
        setDetails(detailsResponse);
    };

    useEffect(() => {
        if (!isOnScreen) return;
        if (details) return;
        handleFetchDetails();
    }, [isOnScreen]);

    return (
        <Container ref={ref}>
            {coverPath && (
                <img src={getTmdbPosterPathUrl(coverPath)} alt="cover" />
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
                                        details.deathday
                                    )}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </p>
                    {rating && (
                        <MovieItemRating className="rating">
                            <LuStar /> {rating.toFixed(1)}
                        </MovieItemRating>
                    )}
                </div>
                <div className="column description">
                    {year && <div className="description-item">{year}</div>}

                    {description && (
                        <div className="description-item">{description}</div>
                    )}
                </div>
            </div>
        </Container>
    );
}
