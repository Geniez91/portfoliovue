import { ClassConstructor, plainToInstance, Transform } from "class-transformer";

export function TransformJsonArray<T>(cls: ClassConstructor<T>) {
  return Transform(({ value }) => {
    const parsed =
      typeof value === 'string'
        ? JSON.parse(value)
        : value;

    return plainToInstance(cls, parsed);
  });
}