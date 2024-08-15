import { EventHandler } from "react";

export interface InvidiousVideo {
    type: "video";
    title: string;
    videoId: string;
    author: string;
    authorId: string;
    authorUrl: string;
    videoThumbnails: [
        {
            quality: string;
            url: string;
            width: number;
            height: number;
        },
    ];
    description: string;
    descriptionHtml: string;
    viewCount: number;
    published: number;
    publishedText: string;
    lengthSeconds: number;
    liveNow: boolean;
    paid: boolean;
    premium: boolean;
}

const getEndpoint = (endpoint: string) => {
    return (
        "https://corsproxy.io?" +
        encodeURIComponent("https://invidious.fdn.fr" + endpoint)
    );
};

export const searchByInvidious = async (term: string) => {
    const queryParams = new URLSearchParams({
        sort_by: "relevance",
        type: "video",
        q: term,
    }).toString();
    const response = await fetch(getEndpoint(`/api/v1/search?${queryParams}`));

    const json = await response.json();

    const rawVideos = (json as any[]).filter(
        (item) => item.type === "video",
    ) as InvidiousVideo[];

    return rawVideos;
};

export const handleSearchTrailer =
    (movieName: string) => async (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        const results = await searchByInvidious(`${movieName} Trailer Oficial`);
        if (results.length === 0) return alert("Trailer não encontrado");
        const videoId = results.at(0)?.videoId;

        window.open(`https://youtu.be/${videoId}`, "_blank");
    };
