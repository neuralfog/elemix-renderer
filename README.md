# Elemix Renderer

This package is an internal HTML renderer built for use with the [Elemix framework](https://github.com/neuralfog/elemix). It leverages tagged template literals to define HTML templates and performs direct DOM manipulations—**without using a Virtual DOM**. Inspired by libraries such as [lit-html](https://github.com/lit/lit) and [uhtml](https://github.com/WebReflection/uhtml), it provides an efficient way to render and update HTML, including optimized list rendering through an internal key diffing algorithm.

---

## Key Diffing for List Rendering

For dynamic list updates, the package employs an internal key diffing algorithm to compute the minimal changes required when list items (each identified by a unique key) are updated. The process includes:

- **Mapping Old Keys:**
  Creating a mapping from each key in the existing list to its index.

- **Sequence Generation:**
  Comparing the old list with the new list to generate a sequence that represents their relative order.

- **Longest Increasing Subsequence (LIS):**
  Computing the Longest Increasing Subsequence (LIS) to identify items that are already in the correct order.

- **Determining Operations:**  
  Identifying the necessary deletions, insertions, and moves based on the mapping and LIS.

---

## Usage Example

Below is an example of how to use the public API to render a dynamic template:

```typescript
import { html, render } from 'your-package';

// Create a template
const myTemplate = html`<div>Hello, ${userName}! Welcome to Elemix.</div>`;

// Get a reference to the container element
const container = document.getElementById('app');

// Render the template into the container
render(myTemplate, container);
```
