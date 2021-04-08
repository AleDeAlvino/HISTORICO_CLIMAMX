import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

// import options from "./data";

const MultiSelectAll = (props) => {
  // console.log(this.props.estados);
  // useEffect(() => {
  //   //setSelectedOptions([{ label: "All", value: "*" }, ...props.options]);
  //   // console.log(props.estados);
  // }, []);

  

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...props.options]}
      placeholderButtonLabel={props.placeholderButtonLabel}
      getDropdownButtonLabel={props.getDropdownButtonLabel}
      value={props.value}
      onChange={props.onChange}
      setState={props.setState}
    />
  );
};

export default MultiSelectAll;