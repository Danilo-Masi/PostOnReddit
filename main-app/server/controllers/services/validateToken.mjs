import { decodeToken } from "./decodeToken.mjs";

export const validateToken = async (authHeader) => {
    if (!authHeader) throw { status: 401, message: "Token mancante" };

    const token = authHeader.split(' ')[1];
    if (!token) throw { status: 401, message: "Token non valido" };

    const user = await decodeToken(token);
    if (!user) throw { status: 400, message: "Token non valido" };

    return user.user.id;
};