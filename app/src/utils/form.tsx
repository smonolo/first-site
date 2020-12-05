import validator from 'validator';

import { allowedEmailChars } from '../constants';

export const isUsernameEmailInvalid = (username: string) => {
  const value: string = validator.unescape(validator.trim(username));

  if (!value) {
    return 'username is missing';
  }

  if (value.length < 3) {
    return 'username is too short';
  }

  if (value.length > 320) {
    return 'username is too long';
  }

  if (!value.match(allowedEmailChars)) {
    return 'username contains invalid characters';
  }

  return false;
};