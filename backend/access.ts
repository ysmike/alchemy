// at its simplest, access control returns a yes or no value depending on the
// user's session

import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// permissions check if someone meets a criteria
export const permissions = { ...generatedPermissions };

// rule based function rules can return a boolean or a filter which limits which
// products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // if not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageProducts({ session })) {
      return true; // they can read everything!
    }
    // they should only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // otherwise they may only update themselves!
    return { id: session.itemId };
  },
};
