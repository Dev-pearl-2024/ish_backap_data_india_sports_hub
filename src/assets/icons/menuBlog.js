import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MenuBlog = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={11}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      stroke="#000"
      strokeWidth={0.4}
      d="M1 .733h11.095v1.032H1V.733Zm0 4.515h15v1.033H1V5.248Zm0 4.009h9.326v1.032H1V9.257Z"
    />
  </Svg>
)
export default MenuBlog
