import React, {createContext, PropsWithChildren} from 'react';

export interface IdentityIdProps {
  identityId?: string;
}
export const IdentityIdContext = createContext<IdentityIdProps>({identityId: undefined});

type Props = IdentityIdProps & PropsWithChildren;
const IdentityIdProvider: React.FC<Props> = ({identityId, children}) => {
  return <IdentityIdContext.Provider value={{identityId}}>{children}</IdentityIdContext.Provider>;
};

export default IdentityIdProvider;
