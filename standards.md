Coding Standards for Backend Development

Naming Convention: All class names follow PascalCase (e.g., Restaurant), and all methods/attributes follow camelCase (e.g., submitReview).

- Visibility Mapping: In alignment with Worksheet 5, all data attributes are kept private within Mongoose Schemas, while operations are exposed as public methods.

- Data Integrity: Type checking is enforced at the Schema level (e.g., AggregateRating as a Float/Number) to ensure alignment with design specifications. \_ Layered Architecture: Domain Entities (Models) are strictly separated from System Behaviors (Controllers) to ensure high cohesion and low coupling.
