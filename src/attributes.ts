import { Attributes } from './constants';
import type { AttributeHole } from './holes/attributes/AttributeHole';
import { EmitHole } from './holes/attributes/EmitHole';
import { EventHole } from './holes/attributes/EventHole';
import { ModelHole } from './holes/attributes/ModelHole';
import { PropHole } from './holes/attributes/PropHole';
import { RefHole } from './holes/attributes/RefHole';
import { StringHole } from './holes/attributes/StringHole';
import { makeMarkerComment } from './utils';

export type AttributeDefinition = {
    index: number;
    name: string;
    value: string;
    virtual: boolean;
    type: Attributes;
};

export const detectAttributes = (
    strings: string,
    index: number,
): AttributeDefinition | undefined => {
    const regex = /(\S+)(?==(?:["']?)$)/;
    const match = strings.match(regex);

    if (match) {
        const result = {
            index: index,
            name: match[1],
            value: makeMarkerComment(index),
            virtual: false,
            type: Attributes.STD,
        };

        switch (match[1][0]) {
            case '@':
                if (match[1].startsWith('@emits:')) {
                    result.type = Attributes.EMIT;
                    result.virtual = true;
                    return result;
                }

                result.type = Attributes.EVENT;
                result.virtual = true;
                return result;
            case ':':
                if (match[1].endsWith(':ref')) {
                    result.type = Attributes.REF;
                    result.virtual = true;
                    return result;
                }
                result.type = Attributes.PROP;
                result.virtual = true;
                return result;
            case '~':
                if (match[1].startsWith('~model')) {
                    result.type = Attributes.MODEL;
                    result.virtual = true;
                }
                return result;
            default:
                return result;
        }
    }

    return undefined;
};

export const processAttribute = (
    fragment: DocumentFragment,
    definition: AttributeDefinition,
): AttributeHole | undefined => {
    const node = fragment.querySelector<HTMLElement>(
        selectorPattern(definition.name, definition.value),
    );

    if (node) {
        if (definition.virtual) {
            node.removeAttribute(definition.name);
        }

        switch (definition.type) {
            case Attributes.EVENT:
                return new EventHole(node, definition);
            case Attributes.PROP:
                return new PropHole(node, definition);
            case Attributes.MODEL:
                return new ModelHole(node, definition);
            case Attributes.REF:
                return new RefHole(node, definition);
            case Attributes.EMIT:
                return new EmitHole(node, definition);
            default:
                return new StringHole(node, definition);
        }
    }

    return undefined;
};

const escapeAttributeName = (name: string): string => {
    let escaped = '';
    for (let i = 0; i < name.length; i++) {
        const char = name.charAt(i);
        const code = char.charCodeAt(0);
        const isAllowed =
            (code >= 48 && code <= 57) || // 0-9
            (code >= 65 && code <= 90) || // A-Z
            (code >= 97 && code <= 122) || // a-z
            char === '-' ||
            char === '_';
        if (isAllowed) {
            escaped += char;
        } else {
            escaped += `\\${char}`;
        }
    }
    return escaped;
};

const selectorPattern = (name: string, value: string): string =>
    `[${escapeAttributeName(name)}='${value}']`;
