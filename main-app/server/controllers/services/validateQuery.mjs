export const validateQuery = (q) => {
    if (!q || q.trim().length < 2 || q.trim().length > 100) {
        throw { status: 400, message: "Query non valida" };
    }
    return q.startsWith('r/') ? q.substring(2) : q;
}