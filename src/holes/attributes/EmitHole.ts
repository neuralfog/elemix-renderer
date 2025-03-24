import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

type Component = {
    $emits: {
        set: (name: string, value: unknown) => void;
    };
} & HTMLElement;

export class EmitHole implements AttributeHole {
    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: unknown): void {
        if (value === undefined) return;
        const { name } = this.definition;
        const node = this.node as Component;
        if (node.$emits) {
            node.$emits.set(name.slice(name.indexOf(':') + 1), value);
        }
    }
}
