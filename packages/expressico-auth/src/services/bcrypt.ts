import bcrypt from 'bcryptjs';

const salt = () => bcrypt.genSaltSync(10);

export const encryptPassword = (password: string) => bcrypt.hashSync(password, salt());

export const validatePassword = (actual: string, test: string) => bcrypt.compareSync(test, actual);

