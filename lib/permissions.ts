export type AdminRole =
  | "super_admin"
  | "editor"
  | "reviewer";

export function canManageAdmins(role?: AdminRole) {
  return role === "super_admin";
}

export function canDelete(role?: AdminRole) {
  return role === "super_admin";
}

export function canEdit(role?: AdminRole) {
  return role === "super_admin" || role === "editor";
}

export function canCreate(role?: AdminRole) {
  return role === "super_admin" || role === "editor";
}

export function canReview(role?: AdminRole) {
  return (
    role === "super_admin" ||
    role === "reviewer"
  );
}

export function isSuperAdmin(role?: AdminRole) {
  return role === "super_admin";
}