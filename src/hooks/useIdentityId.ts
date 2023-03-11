import {useContext} from 'react';
import {IdentityIdContext} from '../providers/IdentityIdProvider';

export const useIdentityId = (): string | undefined => {
  const context = useContext(IdentityIdContext);
  return context ? context.identityId : undefined;
};
