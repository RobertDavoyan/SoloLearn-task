export function removeFromArray(array, findFn) {
    const index = array.findIndex(findFn);
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
}

export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function ranking(data, RNG = 1000) {
    const dateCoef = RNG / Math.max(...(data.map(d => (new Date) - (new Date(d.createdAt)))));
    const likeCoef = RNG / Math.max(...data.map(d => d.likes || 0.1));
    const dislikeCoef = RNG / Math.max(...data.map(d => d.dislikes || 0.1));

    function rank(a, dateCoef, dislikeCoef, likeCoef) {
        const date = RNG - dateCoef * (new Date - (new Date(a.createdAt)));
        const like = likeCoef * a.likes;
        const disLike = RNG - dislikeCoef * a.dislikes;
        return date + like + disLike;
      }
    data.forEach(d => { d.rank = rank(d, dateCoef, dislikeCoef, likeCoef) });
    
    data.sort((a, b) =>  b.rank - a.rank);
    return data;
}   