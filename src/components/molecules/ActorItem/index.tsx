import tmdb from "@/services/tmdb";
import useOnScreen from "@/hooks/useOnScreen";
import animations from "@/utils/animations";
import { calculateAge, getTmdbPosterPathUrl } from "@/utils/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Cast, Person, PersonDetails } from "tmdb-ts";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;

    height: 100%;
    aspect-ratio: 1/1;
    padding: 0.75rem;
    min-width: 17rem;
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
            object-position: center;
            transition: 0.4s;
        }

        z-index: 0;
    }

    & > * {
        position: relative;
        z-index: 2;
    }

    .name {
        color: #eee;
        font-size: 1.25rem;
        font-weight: 700;
        margin-right: 0.25rem;
    }

    .age {
        color: #b4b4b4;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.4rem;
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

    &:hover {
        &::before {
            opacity: 0.25;
            background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 100%
            );
        }

        .image-wrapper img {
            transform: scale(1.01);
        }
    }
`;

export default function ActorItem({ actor }: { actor: Person | Cast }) {
    const ref = useRef(null);
    const isOnScreen = useOnScreen(ref);
    const navigateTo = useNavigate();
    const [actorDetails, setActorDetails] = useState<PersonDetails | null>(
        null,
    );

    const fetchActorDetails = async () => {
        const response = await tmdb.people.details(actor.id, [], "pt-BR");
        setActorDetails(response);
    };

    useEffect(() => {
        if (!isOnScreen) return;
        if (actorDetails) return;
        console.log(actor.id, "Puxando extra");
        fetchActorDetails();
    }, [isOnScreen]);

    return (
        <Container ref={ref} onClick={() => navigateTo(`/actor/${actor.id}`)}>
            <div className="image-wrapper">
                <img src={getTmdbPosterPathUrl(actor.profile_path)} alt="" />
            </div>
            <h2 className="name">{actor.name}</h2>
            <AnimatePresence>
                {actorDetails && (
                    <motion.span className="age" {...animations.fadeInOut(0.5)}>
                        {calculateAge(actorDetails.birthday)}
                    </motion.span>
                )}
            </AnimatePresence>
        </Container>
    );
}
