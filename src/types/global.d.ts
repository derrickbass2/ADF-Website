// src/types/global.d.ts
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "@components/*" {
  const component: React.ComponentType;
  export default component;
}

declare module "@models/*" {
  interface Model {
    // Define the properties of the model here
    id: string;
    name: string;
  }
  const model: Model; // You can replace 'Model' with a more specific type if needed
  export default model;
}
