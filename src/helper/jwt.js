import jwt from 'jsonwebtoken'

export function generateToken(payload,secret,expiresIn){
    try{
        const token =jwt.sign(payload,secret,{expiresIn})
        return token

    }catch(error){
        throw new Error(error)
    }
}

export function verifyToken(token,secret){
    try{
      const decoded=jwt.verify(token,secret)
      return decoded
    }catch(error){
        throw new Error(error)
    }

}