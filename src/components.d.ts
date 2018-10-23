/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import {
  IComponent,
  IComponentProps,
  IUsage,
} from '@/model';


export namespace Components {

  interface PictoGraph {
    'manifestUrl': string;
  }
  interface PictoGraphAttributes extends StencilHTMLAttributes {
    'manifestUrl'?: string;
  }

  interface PictoMd {
    'source': string;
  }
  interface PictoMdAttributes extends StencilHTMLAttributes {
    'source'?: string;
  }

  interface PictoNav {
    'components': IComponent[];
  }
  interface PictoNavAttributes extends StencilHTMLAttributes {
    'components'?: IComponent[];
  }

  interface PictoPreview {
    'component': IComponent;
    'componentProps': IComponentProps;
    'usage': IUsage;
  }
  interface PictoPreviewAttributes extends StencilHTMLAttributes {
    'component'?: IComponent;
    'componentProps'?: IComponentProps;
    'usage'?: IUsage;
  }

  interface PictoProps {
    'component': IComponent;
    'usage': IUsage;
  }
  interface PictoPropsAttributes extends StencilHTMLAttributes {
    'component'?: IComponent;
    'onPropsChanged'?: (event: CustomEvent) => void;
    'usage'?: IUsage;
  }
}

declare global {
  interface StencilElementInterfaces {
    'PictoGraph': Components.PictoGraph;
    'PictoMd': Components.PictoMd;
    'PictoNav': Components.PictoNav;
    'PictoPreview': Components.PictoPreview;
    'PictoProps': Components.PictoProps;
  }

  interface StencilIntrinsicElements {
    'picto-graph': Components.PictoGraphAttributes;
    'picto-md': Components.PictoMdAttributes;
    'picto-nav': Components.PictoNavAttributes;
    'picto-preview': Components.PictoPreviewAttributes;
    'picto-props': Components.PictoPropsAttributes;
  }


  interface HTMLPictoGraphElement extends Components.PictoGraph, HTMLStencilElement {}
  var HTMLPictoGraphElement: {
    prototype: HTMLPictoGraphElement;
    new (): HTMLPictoGraphElement;
  };

  interface HTMLPictoMdElement extends Components.PictoMd, HTMLStencilElement {}
  var HTMLPictoMdElement: {
    prototype: HTMLPictoMdElement;
    new (): HTMLPictoMdElement;
  };

  interface HTMLPictoNavElement extends Components.PictoNav, HTMLStencilElement {}
  var HTMLPictoNavElement: {
    prototype: HTMLPictoNavElement;
    new (): HTMLPictoNavElement;
  };

  interface HTMLPictoPreviewElement extends Components.PictoPreview, HTMLStencilElement {}
  var HTMLPictoPreviewElement: {
    prototype: HTMLPictoPreviewElement;
    new (): HTMLPictoPreviewElement;
  };

  interface HTMLPictoPropsElement extends Components.PictoProps, HTMLStencilElement {}
  var HTMLPictoPropsElement: {
    prototype: HTMLPictoPropsElement;
    new (): HTMLPictoPropsElement;
  };

  interface HTMLElementTagNameMap {
    'picto-graph': HTMLPictoGraphElement
    'picto-md': HTMLPictoMdElement
    'picto-nav': HTMLPictoNavElement
    'picto-preview': HTMLPictoPreviewElement
    'picto-props': HTMLPictoPropsElement
  }

  interface ElementTagNameMap {
    'picto-graph': HTMLPictoGraphElement;
    'picto-md': HTMLPictoMdElement;
    'picto-nav': HTMLPictoNavElement;
    'picto-preview': HTMLPictoPreviewElement;
    'picto-props': HTMLPictoPropsElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}