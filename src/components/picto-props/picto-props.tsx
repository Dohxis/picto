import {
  Component,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";
import { IComponent, IComponentProp, IUsage } from "@/model";
import { entries } from "lodash-es";

@Component({
  tag: "picto-props",
  styleUrl: "picto-props.styl"
})
export class Props {
  @Prop() component: IComponent;
  @Prop() usage: IUsage;
  @State() componentProps: { [prop: string]: any } = {};
  @Event() propsChanged: EventEmitter;

  @Watch("usage")
  setProps(usage: IUsage) {
    if (!usage.props) {
      return;
    }
    this.componentProps = { ...usage.props };
    this.rawProps = entries(usage.props).reduce(
      (a, [p, v]) => {
        if (typeof v !== "string") {
          a[p] = JSON.stringify(v, null, 2);
        } else {
          a[p] = v;
        }
        return a;
      },
      {} as { [prop: string]: any }
    );
  }

  @Watch("componentProps")
  onPropsChanged() {
    this.propsChanged.emit({ ...this.componentProps });
  }

  componentDidLoad() {
    if (!this.usage || !this.component) return;
    this.setProps(this.usage);
    this.onPropsChanged();
  }

  private rawProps: { [prop: string]: any } = {};

  controlFactories = {
    string: this.createInput.bind(this, "text"),
    boolean: this.createCheckbox.bind(this),
    number: this.createInput.bind(this, "number")
  } as any;

  createInput(type: string, prop: IComponentProp) {
    return (
      <label>
        <div>{prop.attr} </div>
        <input
          type={type}
          value={this.componentProps[prop.name]}
          onInput={e => {
            this.componentProps = {
              ...this.componentProps,
              [prop.name]: (e.currentTarget as HTMLInputElement).value
            };
          }}
        />
      </label>
    );
  }

  createCheckbox(prop: IComponentProp) {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.componentProps[prop.name]}
          onChange={e => {
            this.componentProps = {
              ...this.componentProps,
              [prop.name]: (e.target as HTMLInputElement).checked
            };
          }}
        />
        {prop.attr}
      </label>
    );
  }

  createJSON(prop: IComponentProp) {
    return (
      <label>
        <div>{prop.attr} </div>
        <textarea
          value={this.rawProps[prop.name]}
          onInput={e => {
            let data = (e.target as HTMLInputElement).value;
            this.rawProps[prop.name] = data;
            try {
              data = new Function(`return ${data}`)();
            } catch (err) {
              // noop
            }
            this.componentProps = {
              ...this.componentProps,
              [prop.name]: data
            };
          }}
        />
      </label>
    );
  }

  render() {
    if (!this.component) {
      return null;
    }
    const controls = this.component.props.map(p => {
      let type = p.type;
      if (this.usage.controls && this.usage.controls[p.name]) {
        type = this.usage.controls[p.name];
      }
      if (type && this.controlFactories[type]) {
        return this.controlFactories[type](p);
      } else {
        return this.createJSON(p);
      }
    });
    return [<main>{controls}</main>];
  }
}
