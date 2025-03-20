export const TEMPLATE_MARKER_GLYPH = '₥';

export enum Attributes {
    EVENT = 0,
    PROP = 1,
    MODEL = 2,
    STD = 3,
    REF = 4,
}

// developer.mozilla.org/en-US/docs/Glossary/Void_element
export const VOID_ELEMENTS =
    /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
