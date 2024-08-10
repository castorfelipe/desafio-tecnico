import CarouselSection from "@/components/atoms/CarouselSection";
import ActorItem from "@/components/molecules/ActorItem";
import MovieItem, { MainMovieItem } from "@/components/molecules/MovieItem";
import tmdb, { MainMovie } from "@/components/services/tmdb";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Movie, Person, Recommendation } from "tmdb-ts";
import Navbar from "./components/molecules/Navbar";
import "./global.css";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100%;

    section {
        padding: 1.5rem 0;
    }

    section.main {
        display: flex;
        height: calc(100vh - 6rem);
        gap: 1rem;
        padding-top: 1rem;
        

        .column {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            gap: 1rem;

            .column-title {
                position: relative;
                color: #eee;
                font-size: 1.5rem;
                font-weight: 600;
                line-height: 1.8rem;
                padding-left: 0.75rem;

                &::before {
                    position: absolute;
                    content: "";
                    inset: 0;

                    height: 100%;
                    width: 0.25rem;
                    background: #eee;
                    border-radius: 0.56rem;
                }
            }
        }
    }

    section.new-movies {
    }
`;

function App() {
    const [newMovies, setNewMovies] = useState<Movie[] | null>(null);
    const [popularMovies, setPopularMovies] = useState<Movie[] | null>(null);
    const [mainMovie, setMainMovie] = useState<MainMovie | null>(null);
    const [actors, setActors] = useState<Person[] | null>(null);
    const [recommendations, setRecomenndations] = useState<
        Recommendation[] | null
    >(null);

    const fetchData = async () => {
        const newMoviesResponse = await tmdb.movies.nowPlaying({
            language: "pt-BR",
            page: 1,
        });

        setNewMovies(newMoviesResponse.results);

        const popularMoviesResponse = await tmdb.movies.popular({
            language: "pt-BR",
            page: 1,
        });

        setPopularMovies(popularMoviesResponse.results);

        const mainMovieResponse = await tmdb.movies.details(
            popularMoviesResponse.results[0].id,
            [],
            "pt-BR"
        );

        setMainMovie(mainMovieResponse);

        const recommendations = await tmdb.movies.recommendations(mainMovieResponse.id, {
            language: "pt-BR",
            page: 1,
        });

        setRecomenndations(recommendations.results);

        const actors = await tmdb.people.popular({
            language: "pt-BR",
            page: 1,
        });

        setActors(actors.results);
    };

    // console.log(mainMovie);

    useEffect(() => {
        if (newMovies) return;
        fetchData();
    }, []);

    return (
        <Container>
            <Navbar />

            <section className="main">
                {mainMovie && <MainMovieItem movie={mainMovie} />}

                <div className="column">
                    <h2 className="column-title">Destaques também</h2>
                    {popularMovies &&
                        popularMovies
                            .slice(1, 4)
                            .map((movie) => (
                                <MovieItem movie={movie} key={movie.id} />
                            ))}
                </div>
            </section>

            {newMovies && (
                <section className="new-movies">
                    <CarouselSection title="Lançamentos">
                        {newMovies.map((movie) => (
                            <MovieItem
                                movie={movie}
                                key={movie.id}
                                className="carousel-item"
                            />
                        ))}
                    </CarouselSection>
                </section>
            )}

            {recommendations && (
                <section className="recommendations">
                    <CarouselSection title="Recomendações">
                        {recommendations.map((movie) => (
                            <MovieItem
                                movie={movie}
                                key={movie.id}
                                className="carousel-item"
                            />
                        ))}
                    </CarouselSection>
                </section>
            )}

            {actors && (
                <section className="actors">
                    <CarouselSection title="Celebridades">
                        {actors.map((actor) => (
                            <ActorItem actor={actor} key={actor.id} />
                        ))}
                    </CarouselSection>
                </section>
            )}

            <p className="copyright-notice">© 2024 Rader. All rights reserved</p>
        </Container>
    );
}

export default App;
