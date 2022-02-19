const validateEmail = (email: string) => {
    const reg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;
    return reg.test(email);
};

const validatePwd = (pwd: string) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return reg.test(pwd);
};

export {validateEmail, validatePwd};