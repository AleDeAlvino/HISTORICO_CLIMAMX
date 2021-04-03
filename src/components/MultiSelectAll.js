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

  function ShowSelected(arr)
      {
        var i;
        var n_arr=[];
      for(i=0; i<arr.length; i++){
        if(arr[i].value != '*'){
          n_arr.push(arr[i].value);
        }
      }
      console.log(n_arr);
      this.props.onResponse(n_arr);

    }
    

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      console.log("primer if");
      ShowSelected(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
      console.log("segundo if");
      ShowSelected([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
      console.log("tercer if");
      ShowSelected(value);
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
      console.log("cuarto if");
      ShowSelected(value);
    } else {
      this.setState(value);
      console.log("quinto if");
      ShowSelected(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...props.options]}
      placeholderButtonLabel={props.placeholderButtonLabel}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;