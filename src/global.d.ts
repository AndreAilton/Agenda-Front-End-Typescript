// filepath: c:\Users\andre\Documents\Projetos\React\Agenda\src\global.d.ts
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}
