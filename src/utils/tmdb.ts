export const getTmdbPosterPathUrl = (posterPath: string) =>
    `https://image.tmdb.org/t/p/w1280/${posterPath}`;

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
        return age - diff
    }
    return age;
}
