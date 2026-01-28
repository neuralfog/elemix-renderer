import { TEMPLATE_MARKER_GLYPH } from './constants';

const MARKER_REGEX = new RegExp(`${TEMPLATE_MARKER_GLYPH}(\\d+)`);

export const getIndexFromComment = (comment: string): number => {
    const match = comment.match(MARKER_REGEX);
    if (!match) {
        throw new Error('Unable to extract index from hole comment');
    }
    return Number(match[1]);
};

export const makeMarkerComment = (index: number): string =>
    `<!--${TEMPLATE_MARKER_GLYPH}${index}-->`;

export const fixSelfClosingTags = (input: string): string =>
    input.replace(
        /<([a-zA-Z][^\s/>]*)([\s\S]*?)\/>/g,
        (match: string, tagName: string, rest: string) => {
            if (!tagName.includes('-')) {
                return match;
            }
            return `<${tagName}${rest}></${tagName}>`;
        },
    );

export const fixAttributeQuotes = (input: string): string =>
    input.replace(/(\S+)=((<!--[\s\S]*?-->)|([^\s">]+))/g, '$1="$2"');

export const camelToKebab = (input: string): string =>
    // biome-ignore lint:
    input.replace(/([A-Z])/g, (match) => '-' + match.toLowerCase());

export const mergeClasses = (a: string, b: string): string => {
    return Array.from(
        new Set([...a.split(' '), ...b.split(' ')].filter(Boolean)),
    )
        .join(' ')
        .trim();
};
