// src/types/global.d.ts
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '@components/*' {
    const component: React.ComponentType;
    export default component;
  }
  
  declare module '@models/*' {
    const model: any; // You can replace 'any' with a more specific type if needed
    export default model;
  }