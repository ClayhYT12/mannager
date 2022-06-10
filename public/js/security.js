import bccrypt from 'bcrypt';

function Generatehash(password){
    const salt = bccrypt.genSaltSync(12);
    const hash = bccrypt.hashSync(password,salt);
    return hash;
}

function CompareHash(password, hash){
    return bccrypt.compareSync(password,hash);
}


export default {Generatehash, CompareHash};

