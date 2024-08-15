import { getTmdbPosterPathUrl } from "@/utils/tmdb";
import styled from "styled-components";

interface ImageProps {
    $posterType: "movie" | "person";
    $shouldShowBanner: boolean;
}

const Image = styled.img<ImageProps>`
    position: relative;
    overflow: hidden;
    background-color: #3a3a3a;
`;

export const Cover = ({
    posterPath,
    $posterType,
    style,
}: {
    posterPath: string | null;
    $posterType: "movie" | "person";
    style?: any;
}) => {
    return (
        <Image
            src={posterPath ? getTmdbPosterPathUrl(posterPath) : ""}
            $posterType={$posterType}
            $shouldShowBanner={Boolean(posterPath)}
            style={style}
        ></Image>
    );
};
