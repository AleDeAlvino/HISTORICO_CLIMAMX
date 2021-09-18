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
      options={[{ label: "All", value: "*", isdisabled: props.b_all}, ...props.options]}
      placeholderButtonLabel={props.placeholderButtonLabel}
      getDropdownButtonLabel={props.getDropdownButtonLabel}
      value={props.value}
      onChange={props.onChange}
      setState={props.setState}
      isOptionDisabled={(option) => option.isdisabled = props.b_all}
    />
  );
};

export default MultiSelectAll;