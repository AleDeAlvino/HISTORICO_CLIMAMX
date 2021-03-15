import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

// import options from "./data";

const MultiSelectAll = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  // console.log(this.props.estados);
  useEffect(() => {
    //setSelectedOptions([{ label: "All", value: "*" }, ...props.options]);
    // console.log(props.estados);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} seleccionados`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      console.log("primer if");
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
      console.log("segundo if");
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
      console.log("tercer if");
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
      console.log("cuarto if");
    } else {
      this.setState(value);
      console.log("quinto if");
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...props.options]}
      placeholderButtonLabel="Estados"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;