import MarkedTitle from "@/components/atoms/MarkedTitle";
import Navigator from "@/components/atoms/Navigator";
import Navbar from "@/components/molecules/Navbar";
import MoviesGrid from "@/components/organisms/MoviesGrid";
import tmdb from "@/services/tmdb";
import {
    calculateAge,
    convertBirthdayToTitle,
    getTmdbPosterPathUrl,
} from "@/utils/tmdb";
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AppendToResponse, PersonDetails } from "tmdb-ts";

const Container = styled.div`
    color: #eee;
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    main {
        display: flex;
        flex-grow: 1;
        gap: 0.75rem;

        section.page {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            flex-grow: 2;
        }

        .divider {
            height: 0.125rem;
            background-color: #3a3a3a;
            border-radius: 6.1875rem;
        }
    }

    .grid-wrapper {
        position: relative;
        flex-grow: 1;
    }

    section.actor-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 25rem;
        flex-shrink: 0;
        overflow: auto;

        img {
            aspect-ratio: 1/1;
            width: 100%;
            border-radius: 1.5rem;
            border: 4px solid var(--colors-secondary-borders-6, #3a3a3a);
            object-fit: cover;
        }

        h2.name {
            color: #fff;
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 1.8rem;
        }

        .column {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            p.property {
                color: #eee;
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1.05rem;
            }

            p.value {
                color: #b4b4b4;
                font-size: 1rem;
                font-weight: 500;
                line-height: 1.3125rem;
            }
        }

        .description-column {
            position: relative;
            flex-grow: 2;
            overflow: hidden;

            p.value {
                position: absolute;
                top: 1.3rem;
                padding-bottom: 1.3rem;
                overflow: auto;
                height: 100%;
            }
        }
    }
`;

export default function Actor() {
    const { actorId } = useParams();
    const [actor, setActor] =
        useState<
            AppendToResponse<PersonDetails, "combined_credits"[], "person">
        >();

    const [pageIndex, setPageIndex] = useState(1);
    const fetchActor = async () => {
        const actorResponse = await tmdb.people.details(
            Number(actorId!),
            ["combined_credits"],
            "pt-BR",
        );

        setActor(actorResponse);
    };

    useEffect(() => {
        if (!actorId) return;
        fetchActor();
    }, [actorId]);

    const currentPage = pageIndex;
    const itemsPerPage = 15;
    const sortedCast = useMemo(() => {
        if (!actor) return [];
        const sorted = [...actor.combined_credits.cast].sort(
            (a, b) => b.vote_count - a.vote_count,
        );

        return sorted;
    }, [actor]);
    const slicedCast = useMemo(() => {
        if (!actor) return [];

        const startIndex = Number(currentPage - 1) * itemsPerPage;
        return sortedCast.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedCast, currentPage, itemsPerPage]);

    if (!actor || !slicedCast) return;

    return (
        <Container>
            <Navbar />
            <main>
                <section className="page">
                    <MarkedTitle>Filmes e séries</MarkedTitle>
                    <div className="grid-wrapper">
                        <AnimatePresence mode="sync">
                            <MoviesGrid cast={slicedCast} key={pageIndex} />
                        </AnimatePresence>
                    </div>
                    <div className="divider" />
                    <Navigator
                        currentPage={currentPage}
                        pagesTotal={Math.round(
                            actor.combined_credits.cast.length / itemsPerPage,
                        )}
                        onLeft={() => setPageIndex((i) => i - 1)}
                        onRight={() => setPageIndex((i) => i + 1)}
                    />
                </section>
                <section className="actor-details">
                    <img src={getTmdbPosterPathUrl(actor.profile_path)} />
                    <h2 className="name">{actor.name}</h2>

                    {actor.birthday && (
                        <div className="column">
                            <p className="property">Nascido(a) em:</p>
                            <p className="value">
                                {convertBirthdayToTitle(actor.birthday)} (
                                {calculateAge(actor.birthday)} anos)
                            </p>
                        </div>
                    )}

                    {actor.place_of_birth && (
                        <div className="column">
                            <p className="property">Origem:</p>
                            <p className="value">{actor.place_of_birth}</p>
                        </div>
                    )}

                    {actor.biography && (
                        <div className="column description-column">
                            <p className="property">Sobre:</p>
                            <p className="value">{actor.biography}</p>
                        </div>
                    )}
                </section>
            </main>
            {/* Para cache */}
            {actor.combined_credits.cast.map((item, index) => (
                <img
                    src={getTmdbPosterPathUrl(item.poster_path, "w500")}
                    style={{ display: "none" }}
                    key={index}
                />
            ))}
        </Container>
    );
}
