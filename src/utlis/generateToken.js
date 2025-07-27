import jwt from "jsonwebtoken"

export const generateToken = ({payload = {} , signature = process.env.SIGNATURE , option}) => {

    return jwt.sign(payload , signature , option)
};
