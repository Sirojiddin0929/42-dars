import jwt, { verify } from "jsonwebtoken"

const secret="qwerty12345"
const payload={
    id:1,
    name:"Sirojiddin",
    role:"Student",
    studentId:12210
}
const expiresIn={expiresIn:60*60}
const token=jwt.sign(payload,secret,expiresIn)
console.log(token)

function checkToken(token){
    var decoded= verify(token,secret)
    console.log(decoded)
}

setTimeout(()=>{
    checkToken(token)
},500)
