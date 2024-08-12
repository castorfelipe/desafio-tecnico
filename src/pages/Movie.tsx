import { ButtonWithIcon } from "@/components/atoms/ButtonWithIcon";
import CarouselSection from "@/components/atoms/CarouselSection";
import ActorItem from "@/components/molecules/ActorItem";
import MovieItem from "@/components/molecules/MovieItem";
import { MovieItemRating } from "@/components/molecules/MovieItem/styles";
import Navbar from "@/components/molecules/Navbar";
import tmdb from "@/services/tmdb";
import { getTmdbPosterPathUrl } from "@/utils/tmdb";
import prettyMilliseconds from "pretty-ms";
import { useEffect, useMemo, useState } from "react";
import { LuCircle, LuPlay, LuStar } from "react-icons/lu";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AppendToResponse, MovieDetails } from "tmdb-ts";

const Container = styled.div`
    height: 100%;
    padding: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .banner-wrapper {
        position: relative;
        width: 100%;
        max-height: 29rem;
        overflow: hidden;
        img {
            width: 100%;
            object-fit: cover;
            max-height: 29rem;
        }

        border-radius: 1.5rem;
        &::before {
            position: absolute;
            inset: 0;
            height: 100%;
            content: "";
            background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 17.12%,
                rgba(0, 0, 0, 0.7) 100%
            );
        }

        button.watch-trailer {
            position: absolute;
            left: 3rem;
            bottom: 3rem;
            font-size: 1.25rem;
            font-weight: 600;
        }
    }

    .top-area {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .genres {
        display: flex;
        gap: 0.75rem;

        button.genre {
            display: flex;
            padding: 0.25rem 0.75rem;
            justify-content: center;
            align-items: center;

            border-radius: 6.1875rem;
            border: 2px solid #313131;
            color: #b4b4b4;
        }
    }

    .details {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
    }

    .right-area-wrapper {
        position: relative;
        overflow: hidden;
        height: 100%;
        min-width: 30%;
        min-height: 12rem;
    }

    .right-area {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        gap: 1rem;

        .credits-item {
            position: relative;
            display: flex;
            flex-direction: column;
            padding-left: 0.5rem;

            p.property {
                color: #eee;
                font-size: 1rem;
                font-weight: 600;
                line-height: 1.2rem;
            }

            p.value {
                color: #b4b4b4;
                font-size: 1.125rem;
                font-weight: 400;
                line-height: 1.575rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                color: #b4b4b4;
                text-overflow: ellipsis;
            }

            &::before {
                content: "";
                position: absolute;
                width: 0.25rem;
                background-color: #eee;
                height: 100%;
                left: 0rem;
                border-radius: 0.5625rem;
            }
        }
    }

    .left-area {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .title-area {
            display: flex;
            gap: 0.75rem;
        }
        h2.title {
            color: #fff;
            font-size: 2.5rem;
            font-weight: 700;
        }

        p.rating {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 1.25rem;
            font-weight: 600;
            gap: 0.5rem;

            svg {
                color: #eab308;
                fill: #eab308;
                width: 1.25rem;
                height: 1.25rem;
            }

            span.vote-count {
                color: #b4b4b4;
                font-size: 0.875rem;
                font-weight: 600;
                line-height: 0.875rem;
            }
        }

        p.extra-details {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #b4b4b4;

            svg {
                fill: #b4b4b4;
                height: 0.375rem;
            }
        }

        p.description {
            color: #eee;
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.75rem;
        }
    }
`;

type MovieType = AppendToResponse<
    MovieDetails,
    ("similar" | "release_dates" | "credits" | "images")[],
    "movie"
>;

export default function Movie() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [crew, setCrew] = useState<{ [key: string]: string[] }>({});

    const fetchMovie = async () => {
        const response = await tmdb.movies.details(
            Number(movieId!),
            ["similar", "release_dates", "images", "credits"],
            "pt-BR",
        );

        let credits: { [key: string]: string[] } = {};

        response.credits.crew.forEach((crew) => {
            const value = credits[crew.job];
            if (value) {
                credits[crew.job] = [...value, crew.name];
            } else {
                credits[crew.job] = [];
            }
        });

        Array.from(Object.entries(credits)).forEach(([key, value]) => {
            if (value.length === 0) delete credits[key];
        });

        setCrew(credits);
        setMovie(response);
    };

    useEffect(() => {
        if (!movieId) return;
        if (movie && movieId === movie?.id.toString()) return;
        fetchMovie();
    }, [movieId]);

    const ageRestriction = useMemo(() => {
        if (!movie) return null;
        let brazilAgeRestriction = null;
        let usAgeRestriction = null;

        movie.release_dates.results.forEach((item) => {
            if (item.iso_3166_1 === "US")
                usAgeRestriction = item.release_dates[0].certification;
            if (item.iso_3166_1 === "BR")
                brazilAgeRestriction = item.release_dates[0].certification;
        });

        return { br: brazilAgeRestriction, us: usAgeRestriction };
    }, [movie]);

    return (
        <Container>
            <Navbar />
            {movie && (
                <div className="top-area">
                    <div className="banner-wrapper">
                        <img src={getTmdbPosterPathUrl(movie?.backdrop_path)} />
                        <ButtonWithIcon className="watch-trailer">
                            Assistir ao trailer <LuPlay />
                        </ButtonWithIcon>
                    </div>
                    <div className="genres">
                        {movie.genres.map((genre) => (
                            <button key={genre.id} className="genre">
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {movie && (
                <div className="details">
                    <div className="left-area">
                        <div className="title-area">
                            <h2 className="title">{movie.title}</h2>
                            <p className="rating">
                                <LuStar />
                                {movie.vote_average.toFixed(1)}
                                <span className="vote-count">
                                    | {movie.vote_count}
                                </span>
                            </p>
                        </div>
                        <p className="extra-details">
                            {prettyMilliseconds(movie.runtime * 60 * 1000)}
                            <LuCircle />
                            {ageRestriction?.br || ageRestriction?.us}
                            <LuCircle />
                            {movie.release_date.split("-")[0]}
                        </p>
                        <p className="description">{movie.overview}</p>
                    </div>
                    <div className="right-area-wrapper">
                        <div className="right-area">
                            {Array.from(Object.entries(crew)).map(
                                ([key, value]) => (
                                    <div className="credits-item" key={key}>
                                        <p className="property">{key}</p>
                                        <p className="value">
                                            {value.join(", ")}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            )}

            {movie && (
                <section className="actors">
                    <CarouselSection title="Elenco principal">
                        {movie.credits.cast.map((actor) => (
                            <ActorItem actor={actor} key={actor.id} />
                        ))}
                    </CarouselSection>
                </section>
            )}

            {movie && (
                <section className="similars">
                    <CarouselSection title="Semelhantes">
                        {movie.similar.results.map((movie) => (
                            <MovieItem
                                movie={movie}
                                key={movie.id}
                                className="carousel-item"
                            />
                        ))}
                    </CarouselSection>
                </section>
            )}
        </Container>
    );
}
