declare module "*.svg" {
    import React = require("react")
    export let ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src;
}