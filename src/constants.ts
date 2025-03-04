export const TEMPLATE_MARKER_GLYPH = '₥';

export enum Attributes {
    EVENT = 0,
    PROP = 1,
    DIRECT = 2,
    MODEL = 3,
    STD = 4,
    REF = 5,
}

// developer.mozilla.org/en-US/docs/Glossary/Void_element
export const VOID_ELEMENTS =
    /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
