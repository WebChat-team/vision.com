import { Option as OptionType } from "./types";

const Option: OptionType = ({ children, ...props }) => {

    return (
        <option{...props}>{children}</option>
    );

}

export default Option;