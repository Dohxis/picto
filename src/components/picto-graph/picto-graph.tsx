import { Component, Prop, State, Element } from "@stencil/core";
import { IComponent, IComponentProps } from "@/model";
import { kebabCase } from "lodash-es";
import "@stencil/router";
import { getComponents } from "@/client";

@Component({
  tag: "picto-graph",
  styleUrl: "picto-graph.styl"
})
export class Pictograph {
  @Element() el: HTMLElement;
  @Prop() baseurl: string = "/";
  @State() currentProps: IComponentProps;
  @State() components: IComponent[] = [];
  @State() library: { version: string } = { version: "" };

  async componentWillLoad() {
    const { components, library } = await getComponents(
      this.baseurl + "components.json"
    );
    this.components = components;
    this.library = library;
  }

  onPropsChanged = ({ detail: props }: CustomEvent<IComponentProps>) => {
    this.currentProps = props;
  };

  onComponentRendered(detail: any): void {
    // TODO: Pass default prop values
  }

  render() {
    return [
      <stencil-router>
        <menu>
          <h4>
            <div class="picto-header">{document.title}</div>
            <div class="picto-version">{this.library.version}</div>
          </h4>
          <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", height: '1px', margin: '0 -18px', marginBottom: '15px' }} />
          <picto-nav baseurl={this.baseurl} components={this.components} />
        </menu>
        <main>
          <stencil-route
            url={this.baseurl}
            exact={true}
            routeRender={() => (
              <picto-md
                class="index"
                source={this.el.textContent.replace(/^\s*/gm, "")}
              />
            )}
          />
          {this.components.map(c => (
            <stencil-route
              url={this.baseurl + c.tag}
              routeRender={() => {
                const index = (
                  <stencil-route
                    url={this.baseurl + c.tag}
                    exact={true}
                    routeRender={() => [
                      <picto-preview
                        component={c}
                        usage={c.usage.index.attributes}
                        componentProps={this.currentProps}
                        onRendered={e => this.onComponentRendered(e.detail)}
                      />,
                      <picto-md source={c.usage.index.body} />
                    ]}
                  />
                );
                const usageKeys = Object.keys(c.usage).filter(
                  n => n !== "index"
                );
                const usages = usageKeys.map(n => (
                  <stencil-route
                    url={this.baseurl + c.tag + "/" + kebabCase(n)}
                    routeRender={() => [
                      <picto-preview
                        component={c}
                        usage={c.usage[n].attributes}
                        componentProps={this.currentProps}
                        onRendered={e => this.onComponentRendered(e.detail)}
                      />,
                      <picto-md source={c.usage[n].body} />
                    ]}
                  />
                ));
                return [index, usages];
              }}
            />
          ))}
        </main>
        <aside>
          {this.components.map(c => {
            const index = (
              <stencil-route
                exact={true}
                url={this.baseurl + c.tag}
                routeRender={() => [
                  <picto-props
                    component={c}
                    usage={c.usage.index.attributes}
                    onPropsChanged={this.onPropsChanged}
                  />
                ]}
              />
            );
            const usageKeys = Object.keys(c.usage).filter(n => n !== "index");
            const usages = usageKeys.map(n => (
              <stencil-route
                url={this.baseurl + c.tag + "/" + kebabCase(n)}
                routeRender={() => [
                  <picto-props
                    component={c}
                    usage={c.usage[n].attributes}
                    onPropsChanged={this.onPropsChanged}
                  />
                ]}
              />
            ));
            return [index, usages];
          })}
        </aside>
      </stencil-router>
    ];
  }
}
