import { ButtonWithIcon } from "@/components/atoms/ButtonWithIcon";
import { Cover } from "@/components/atoms/Cover";
import {
    MovieItemContent,
    MovieItemHighlightTag,
    MovieItemRating,
} from "@/components/molecules/MovieItem/styles";
import { MainMovie } from "@/services/tmdb";
import prettyMilliseconds from "pretty-ms";
import { useRef } from "react";
import { LuFlame, LuPlay, LuStar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Movie, Recommendation } from "tmdb-ts";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    cursor: pointer;

    .image-wrapper {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;

        overflow: hidden;
        border-radius: 1.5rem;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.4s;
        }

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 100%
            );
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0.5;
            transition: all 0.25s;
        }
    }

    &.main-item {
        width: 60%;
        overflow: hidden;
        aspect-ratio: 1/1;
        border-radius: 1.5rem;
        height: 100%;

        img {
            height: 100%;
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
            opacity: 1;
        }
    }

    &.carousel-item {
        min-width: 24rem;
        height: 16rem;
        max-width: 24rem;
    }

    &:hover {
        .image-wrapper::before {
            opacity: 0.25;
        }
        .image-wrapper img {
            transform: scale(1.01);
            filter: saturate(1.05);
        }
    }

    @media (max-width: 1200px) {
        &.carousel-item {
            min-width: 15rem !important;
            max-width: 15rem !important;

            h2.movie-name {
                font-size: 1rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &.main-item {
            p.description {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
`;

export default function MovieItem({
    className,
    movie,
    shouldUsePoster,
}: {
    className?: string;
    movie: Movie | Recommendation;
    shouldUsePoster?: boolean;
}) {
    const navigateTo = useNavigate();
    const clickPointRef = useRef<number | null>(null);

    return (
        <Container
            className={className}
            onClick={(e) => {
                if (e.screenX !== clickPointRef.current) return;
                navigateTo(`/movie/${movie.id}`);
            }}
            onPointerDown={(e) => (clickPointRef.current = e.screenX)}
        >
            <div className="image-wrapper">
                <Cover
                    posterPath={
                        shouldUsePoster
                            ? movie.poster_path!
                            : movie.backdrop_path!
                    }
                    $posterType="movie"
                />
            </div>
            <MovieItemContent>
                <MovieItemRating>
                    <LuStar />
                    {movie.vote_average.toFixed(1)}
                </MovieItemRating>

                <h2 className="movie-name">{movie.title}</h2>
                <ButtonWithIcon className="watch-trailer">
                    Assistir ao trailer <LuPlay />
                </ButtonWithIcon>
            </MovieItemContent>
        </Container>
    );
}

export function MainMovieItem({ movie }: { movie: MainMovie }) {
    const movieRuntimeMs = movie.runtime * 60 * 1000;
    const navigateTo = useNavigate();
    return (
        <Container
            className={"main-item"}
            onClick={() => navigateTo(`/movie/${movie.id}`)}
        >
            <div className="image-wrapper">
                <Cover posterPath={movie.backdrop_path} $posterType="movie" />
            </div>
            <MovieItemContent className="main-item">
                <MovieItemHighlightTag className="no-margin">
                    <LuFlame />
                    Em destaque
                </MovieItemHighlightTag>

                <h2 className="movie-name">{movie.title}</h2>
                <div className="statistics-row">
                    <div className="row">
                        <MovieItemRating className="simple-rating">
                            <LuStar />
                            {movie.vote_average.toFixed(1)}
                        </MovieItemRating>
                        <span>| {movie.vote_count}</span>
                    </div>
                    <div className="row-divider" />
                    <span>{prettyMilliseconds(movieRuntimeMs)}</span>
                    <div className="row-divider" />
                    <span>{movie.genres.map((g) => g.name).join(", ")}</span>
                    <div className="row-divider" />
                    <span>2024</span>
                </div>
                <p className="description">{movie.overview}</p>

                <ButtonWithIcon className="watch-trailer main-item">
                    Assistir ao trailer <LuPlay />
                </ButtonWithIcon>
            </MovieItemContent>
        </Container>
    );
}
