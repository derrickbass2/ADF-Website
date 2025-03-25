// src/types/global.d.ts
declare module "*.module.scss" {
  const styles: { [key: string]: string };
  export default styles;
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
