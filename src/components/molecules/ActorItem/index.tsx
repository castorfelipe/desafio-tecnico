import tmdb from "@/components/services/tmdb";
import useOnScreen from "@/hooks/useOnScreen";
import animations from "@/utils/animations";
import { calculateAge, getTmdbPosterPathUrl } from "@/utils/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Person, PersonDetails } from "tmdb-ts";

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;

    height: 100%;
    aspect-ratio: 1/1;
    padding: 0.75rem;
    min-width: 17rem;

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
            rgba(0, 0, 0, 0.5) 100%
        );
        width: 100%;
        height: 100%;
        z-index: 1;
    }
`;

export default function ActorItem({ actor }: { actor: Person }) {
    const ref = useRef(null);
    const isOnScreen = useOnScreen(ref);
    const [actorDetails, setActorDetails] = useState<PersonDetails | null>(
        null
    );

    const fetchActorDetails = async () => {
        const response = await tmdb.people.details(actor.id, [], "pt-BR");
        console.log(response);
        setActorDetails(response);
    };

    useEffect(() => {
        if (!isOnScreen) return;
        if (actorDetails) return;
        console.log(actor.id, "Puxando extra");
        fetchActorDetails();
    }, [isOnScreen]);

    return (
        <Container ref={ref}>
            <div className="image-wrapper">
                <img src={getTmdbPosterPathUrl(actor.profile_path)} alt="" />
            </div>
            <h2 className="name">{actor.name}</h2>
            <AnimatePresence>
                {actorDetails && (
                    <motion.span className="age" {...animations.fadeInOut(.5)}>
                        {calculateAge(actorDetails.birthday)}
                    </motion.span>
                )}
            </AnimatePresence>
        </Container>
    );
}
