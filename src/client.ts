import { IComponent } from "@/model";
import FM from "front-matter";

const parseComponent = (c: IComponent) => {
  let component = { ...c };
  component = addReadme(c);
  return component;
};

const addReadme = (c: IComponent) => {
  let component = { ...c };
  component.usage["index"] = FM(component.fullReadme as string);
  return component;
};

export async function getComponents(url: string) {
  const {
    components,
    library
  }: { components: IComponent[]; library: { version: string } } = await fetch(
    url
  ).then(res => res.json());

  return { components: components.map(parseComponent), library };
}
