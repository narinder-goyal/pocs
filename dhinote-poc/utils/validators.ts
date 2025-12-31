export function isNonEmpty(value: string | null | undefined) {
    return !!value && value.trim().length > 0;
  }