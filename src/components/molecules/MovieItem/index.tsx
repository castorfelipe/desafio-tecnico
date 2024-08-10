import { ButtonWithIcon } from "@/components/atoms/ButtonWithIcon";
import {
    MovieItemContent,
    MovieItemHighlightTag,
    MovieItemRating,
} from "@/components/molecules/MovieItem/styles";
import { LuFlame, LuPlay, LuStar } from "react-icons/lu";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;

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
            opacity: 0.5;
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
        }
    }
`;

export default function MovieItem({ url }: { url: string }) {
    return (
        <Container>
            <div className="image-wrapper">
                <img src={url} alt="" />
            </div>
            <MovieItemContent>
                <MovieItemRating>
                    <LuStar />
                    7.8
                </MovieItemRating>

                <h2 className="movie-name">Divertidamente 2</h2>
                <ButtonWithIcon className="watch-trailer">
                    Assistir ao trailer <LuPlay />
                </ButtonWithIcon>
            </MovieItemContent>
        </Container>
    );
}

export function MainMovieItem({ url }: { url: string }) {
    return (
        <Container className={"main-item"}>
            <div className="image-wrapper">
                <img src={url} alt="" />
            </div>
            <MovieItemContent className="main-item">
                <MovieItemHighlightTag className="no-margin">
                    <LuFlame />
                    Em destaque
                </MovieItemHighlightTag>

                <h2 className="movie-name">Deadpool & Wolverine</h2>
                <div className="statistics-row">
                    <div className="row">
                        <MovieItemRating className="simple-rating">
                            <LuStar />
                            7.8
                        </MovieItemRating>
                        <span>| 120 mil</span>
                    </div>
                    <div className="row-divider" />
                    <span>2h 8m</span>
                    <div className="row-divider" />
                    <span>Comedy, Action, Adventure, Superhero...</span>
                    <div className="row-divider" />
                    <span>2024</span>
                </div>
                <p className="description">
                    Deadpool recebe uma oferta da Autoridade de Variância
                    Temporal para se juntar ao Universo Cinematográfico Marvel,
                    mas em vez disso recruta uma variante do Wolverine para
                    salvar seu universo da extinção.
                </p>

                <ButtonWithIcon className="watch-trailer main-item">
                    Assistir ao trailer <LuPlay />
                </ButtonWithIcon>
            </MovieItemContent>
        </Container>
    );
}
