import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

export class StringHole implements AttributeHole {
    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: unknown): void {
        if (value === undefined) return;
        this.node.setAttribute(this.definition.name, String(value));
    }
}
