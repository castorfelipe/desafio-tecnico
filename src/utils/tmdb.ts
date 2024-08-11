import { MultiSearchResult } from "tmdb-ts";
// w1280
export const getTmdbPosterPathUrl = (posterPath: string, maxRes?: boolean) =>
    `https://image.tmdb.org/t/p/${maxRes ? "original" : "w1280"}/${posterPath}`;

export function calculateAge(birthday: string, deathday?: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    // Caso o cara já tenha morrido, calcula a idade que ele tinha antes de ir de arrasta pra cima (idade do morto)
    if (deathday) {
        const diff = calculateAge(deathday);
        return age - diff;
    }
    return age;
}

const knownForNames: { [key: string]: string } = {
    Acting: "Ator",
    Directing: "Diretor",
    Production: "Produtor",
};

export const getMultiSearchData = (item: MultiSearchResult) => {
    if (item.media_type === "movie") {
        return {
            title: item.title,
            coverPath: item.poster_path,
            rating: item.vote_average,
            description: item.overview,
            relased_year: item.release_date.split("-")[0],
        };
    }

    if (item.media_type === "tv") {
        return {
            title: item.name,
            coverPath: item.poster_path,
            rating: item.vote_average,
            description: item.overview,
            relased_year: item.first_air_date.split("-")[0],
        };
    }

    const role =
        knownForNames[item.known_for_department] || item.known_for_department;

    return {
        title: item.name,
        coverPath: item.profile_path,
        description: `${role}: ${item.known_for
            .map((d) => {
                if (d.media_type === "movie") return d.title;
                return d.name;
            })
            .join(", ")}`,
    };
};

const convertBirthdayToDate = (birthday: string) => {
    const [year, month, day] = birthday.split("-").map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject
};

export const convertBirthdayToTitle = (birthday: string) => {
    const date = convertBirthdayToDate(birthday)

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    // Extract day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${day} de ${month} de ${year}`;

    return formattedDate
};
