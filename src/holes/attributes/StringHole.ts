import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

export class StringHole implements AttributeHole {
    private lastValue?: string;

    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: unknown): void {
        if (value === undefined) return;
        const next = String(value);
        if (this.lastValue === next) return;
        this.lastValue = next;
        this.node.setAttribute(this.definition.name, next);
    }
}
