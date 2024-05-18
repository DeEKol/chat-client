type Mods = Record<string, boolean | string>

/* Params:
    cls - базовый класс
    mods - динамические стили (boolean)
    additional - дополнительные стили
*/
export default function (cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className, value]) => className),
    ].join(' ');
}
