import {Action} from '.';
import {ActionType} from './type';

export const registerProfileLoadedPageOne = ({
  fullname,
  email,
  phoneNumber,
  password,
}: {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
}): Action => {
  return {
    type: ActionType.PROFILE_PAGE_ONE,
    payload: {
      fullname,
      email,
      phoneNumber,
      password,
    },
  };
};

export const registerProfileLoadedPageTwo = ({
  companyName,
  cacRegistrationNumber,
  companyEmail,
  companyContact,
  companyAddress,
  interestedInHardware,
  state,
}: {
  companyName: string;
  cacRegistrationNumber: string;
  companyEmail: string;
  companyContact: string;
  companyAddress: string;
  interestedInHardware: string;
  state: string;
}): Action => {
  return {
    type: ActionType.PROFILE_PAGE_TWO,
    payload: {
      companyName,
      cacRegistrationNumber,
      companyEmail,
      companyContact,
      companyAddress,
      interestedInHardware,
      state,
    },
  };
};
