import { MovieItemRating } from "@/components/molecules/MovieItem/styles";
import { getTmdbPosterPathUrl } from "@/utils/tmdb";
import { motion } from "framer-motion";
import { LuStar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PersonMovieCast, PersonTvShowCast } from "tmdb-ts";

const Container = styled(motion.div)`
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);

    height: 100%;
    gap: 0.75rem;

    .grid-item {
        display: flex;
        gap: 0.5rem;
        padding: 0.25rem;
        /* background-color: red; */
        height: fit-content;
        border-radius: 1rem;
        transition: 0.1s;
        cursor: pointer;

        img {
            height: 8rem;
            border-radius: 0.75rem;
            border: 2px solid var(--colors-secondary-borders-6, #3a3a3a);
            aspect-ratio: 1280/1920;
        }

        .column {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: space-evenly;

            &.small {
                gap: 0.25rem;
            }
        }

        p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            align-self: stretch;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .title {
            color: #fff;

            font-size: 0.875rem;
            font-weight: 600;
        }

        .rating {
            background: none;
            color: #eee;
            font-size: 0.75rem;
            font-weight: 600;
            line-height: 0.75rem;
            padding: 0;
            margin: 0;

            svg {
                width: 1rem;
                height: 1rem;
            }
        }

        .other {
            color: #b4b4b4;
            font-size: 0.8125rem;
            font-weight: 500;
            line-height: 0.75rem;
        }

        &:hover {
            background-color: #3a3a3a;
        }
    }
`;

const getData = (item: PersonMovieCast & PersonTvShowCast) => {
    return {
        title: item.name || item.title,
        coverPath: item.poster_path,
        rating: item.vote_average,
        description: item.overview,
        relased_year:
            item.release_date?.split("-")[0] ||
            item.first_air_date?.split("-")[0],
    };
};
export default function MoviesGrid({
    cast,
}: {
    cast: (PersonMovieCast & PersonTvShowCast)[];
}) {
    const navigateTo = useNavigate();
    return (
        <Container
            initial={{ opacity: 0, top: -0, pointerEvents: "none" }}
            animate={{ opacity: 1, top: 0, pointerEvents: "all" }}
            exit={{ opacity: 0, top: 0, pointerEvents: "none" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            {cast.map((item, index) => {
                const { title, coverPath, rating, relased_year } =
                    getData(item);

                return (
                    <div
                        className="grid-item"
                        key={index}
                        onClick={() => navigateTo(`/movie/${item.id}`)}
                    >
                        <img src={getTmdbPosterPathUrl(coverPath, "w500")} />
                        <div className="column">
                            <div className="column small">
                                <p className="title">{title}</p>
                                <MovieItemRating className="rating">
                                    <LuStar />
                                    {rating.toFixed(1)}
                                </MovieItemRating>
                            </div>
                            <p className="other">{item.character}</p>
                            <p className="other">{relased_year}</p>
                        </div>
                    </div>
                );
            })}
        </Container>
    );
}
