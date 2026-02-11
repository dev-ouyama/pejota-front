export type Permission = string;

export function hasPermission(
  userPermissions: Permission[] | undefined | null,
  required?: Permission | Permission[]
): boolean {
  // no required permission -> allow
  if (required == null) return true;

  if (!userPermissions || userPermissions.length === 0) return false;

  if (Array.isArray(required)) {
    return required.every((p) => userPermissions.includes(p));
  }

  return userPermissions.includes(required);
}
