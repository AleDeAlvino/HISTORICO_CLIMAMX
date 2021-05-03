//import { ISO_8601 } from "moment";
import { set } from "mongoose";
import React, { useState, useEffect } from "react";

//import Select from "react-select";
import makeAnimated from "react-select/animated";

// import Input from "../components/Input";
import MultiSelectAll from "../components/MultiSelectAll";


const animatedComponents = makeAnimated();


function App () {

  const [ID_ESTACION, setID_ESTACION] = useState("");
  const [FECHA, setFECHA] = useState("");
  const [PRECIP, setPRECIP] = useState("");
  const [EVAP, setEVAP] = useState("");
  const [TMAX, setTMAX] = useState("");
  const [TMIN, setTMIN] = useState("");
  const [_id, set_id] = useState("");
  const [datos, setdatos] = useState([]);
  const [estados, setestados] = useState([]);
  const [municipios, setmunicipios] = useState([]);
  const [lista, setlista] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [a_es, seta_es] = useState([]);
  const [a_mun, seta_mun] = useState([]);
  const [bole, set_bole] = useState(false);

  var i;
  var n_es=[];
  var n_mun=[];
  //setid_estacion(1);
  //console.log(id_estacion);

const addDato = (e)=>{
    if (_id) {
      fetch(`/api/dato/${_id}`, {
        method: "PUT",
        body: JSON.stringify(useState()),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Dato Actualizado" });
          setFECHA("");
          setPRECIP("");
          setEVAP("");
          setTMAX("");
          setTMIN("");
          fetchDato();
        });
    } else {
      fetch("/api/dato", {
        method: "POST",
        body: JSON.stringify(useState()),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Poducto guardado" });
          setID_ESTACION("");
          setFECHA("");
          setPRECIP("");
          setEVAP("");
          setTMAX("");
          setTMIN("");
          fetchDato();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

// const componentDidMount = () =>{
//     fetchDato();
//   }


const fetchDato = () => {
    fetch("/api/dato")
      .then((res) => res.json())
      .then((data) => {
        setdatos(data);
        console.log(datos);
      });
      fetchEstado();
      fetchMunicipio();
  }

const deleteDato = (id) =>{
    if (confirm("¿Estas seguro de Eliminarlo?")) {
      fetch(`/api/dato/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Dato eliminado" });
          fetchDato();
        });
    }
  }

const  editDato = (id) => {
    fetch(`/api/dato/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setID_ESTACION(data.ID_ESTACION);
        setFECHA(data.FECHA);
        setPRECIP(data.PRECIP);
        setEVAP(data.EVAP);
        setTMAX(data.TMAX);
        setTMIN(data.TMIN);
        set_id(data._id);
      });
  }


  /*const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }*/

const fetchEstado = () => {
    fetch("/api/dato/estados")
      .then((res) => res.json())
      .then((data) => {
        setestados(data);
        console.log(estados);
      });
  }

const fetchMunicipio = () => {
    fetch("/api/dato/municipios")
      .then((res) => res.json())
      .then((data) => {
        setmunicipios(data);
        console.log(municipios);
      });
  }


  
    
    useEffect(() => {
      
      if(datos[0] == null){
        fetchDato();
      }
        //console.log("entraste al fetch");
      
      SearchMun(2);
      
    }, [bole]);

    function SearchMun(variable){
      fetch("/api/dato/search_mun", {
        method: "POST",
        body: JSON.stringify({a_es}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        //setmostrar_mun(data);
        console.log("esta es d:  "+data);
        setSelectedOptions2(data);
        if(variable==1){
          set_bole(true)
        }
        else{
          set_bole(false)
          seta_es([]);
        }
      });
    }

    function getDropdownButtonLabel2({ placeholderButtonLabel, value }) {
      if (value && value.some((o) => o.value === "*")) {
        return `${placeholderButtonLabel}: All`;
      }else {
        if(bole==false){
          return `${placeholderButtonLabel}: ${value.length} seleccionados`;
        }
        else{
        return `${placeholderButtonLabel}: cargando...`;
        }
      }
    }

    function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
      if (value && value.some((o) => o.value === "*")) {
        return `${placeholderButtonLabel}: All`;
      } else {
        return `${placeholderButtonLabel}: ${value.length} seleccionados`;
      }
    }

    
    function ShowSelected(arr, nom)
        {
          console.log("estoy en show");
          console.log("este es arr:"+arr+".");
          if(arr[0]== null){
            console.log("entre al else")
            seta_es([]);
            SearchMun(1);
          }else if(arr[0]!=null){
            for(i=0; i<arr.length; i++){
              console.log("entre al for");
              if(arr[i].value != '*'){
                console.log("entre a 2 if");
                if(nom=="Estados"){
                  n_es.push(arr[i].value);
                  seta_es(n_es);
                  console.log("esta es a_es:  "+n_es);
                  SearchMun(1);
                }
                else if (nom=="Municipios"){
                  n_mun.push(arr[i].value);
                  seta_mun(n_mun);
                  
                }
              }
            }
          }
        console.log(a_es);
      }
      
  
    function onChange(value, event) {

      var nom = this.placeholderButtonLabel;
      console.log(nom);
      if (event.action === "select-option" && event.option.value === "*") {
        this.setState(this.options);
        console.log("primer if");
        ShowSelected(this.options, nom);
      } else if (
        event.action === "deselect-option" &&
        event.option.value === "*"
      ) {
        this.setState([]);
        console.log("segundo if");
        ShowSelected([], nom);
      } else if (event.action === "deselect-option") {
        this.setState(value.filter((o) => o.value !== "*"));
        console.log("tercer if");
        ShowSelected(value, nom);
      } else if (value.length === this.options.length - 1) {
        this.setState(this.options);
        console.log("cuarto if");
        ShowSelected(this.options, nom);
      } else {
        this.setState(value);
        console.log("quinto if");
        ShowSelected(value, nom);
      }
    }


    return (
        
      <div>
        {/* {Navigation} */}
        <nav className="navbar navbar-dark bg-primary">

        <a className="navbar-brand" id="title_head">HISTORICO</a>

        <div id="barra_filtros">
        <div className="filter" >
          <MultiSelectAll
            id="multi_est"
            options={estados}
            placeholderButtonLabel="Estados"
            getDropdownButtonLabel={getDropdownButtonLabel}
            value={selectedOptions}
            onChange={onChange}
            setState={setSelectedOptions}
            n_es={n_es}
          />
        </div>
        
        <div className="filter" >
        <MultiSelectAll
          id="multi_mun"
          options={municipios}
          placeholderButtonLabel="Municipios"
          getDropdownButtonLabel={getDropdownButtonLabel2}
          value={selectedOptions2}
          onChange={onChange}
          setState={setSelectedOptions2}
          n_es={n_es}
          />
        </div>
        </div>

        

        </nav>
        
        <div className="container">
          <div className="row">
            {/* <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addDato}>
                                        <Input name={'id_estacion'} type={'number'} placeholder={'id_estacion'} action={this.handleChange} value={this.state.id_estacion}/>
                                        <Input name={'FECHA'} type={'date'} placeholder={'FECHA'} action={this.handleChange} value={this.state.FECHA}/>
                                        <Input name={'PRECIP'} type={'number'} placeholder={'PRECIP'} action={this.handleChange} value={this.state.PRECIP}/>
                                        <Input name={'EVAP'} type={'number'} placeholder={'EVAP'} action={this.handleChange} value={this.state.EVAP}/>
                                        <Input name={'TMAX'} type={'number'} placeholder={'TMAX'} action={this.handleChange} value={this.state.TMAX}/>
                                        <Input name={'TMIN'} type={'number'} placeholder={'TMIN'} action={this.handleChange} value={this.state.TMIN}/>
                                        <button type="submit" className="btn btn-light darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div> */}
            <div className="col s7">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID_ESTACION</th>
                    <th scope="col">FECHA</th>
                    <th scope="col">PRECIP</th>
                    <th scope="col">EVAP</th>
                    <th scope="col">TMAX</th>
                    <th scope="col">TMIN</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((datos) => {
                    return (
                      <tr key={datos._id}>
                        <td>{datos.ID_ESTACION}</td>
                        <td>
                          {datos.FECHA.substr(8, 2)}
                          {datos.FECHA.substr(4, 3)}-{datos.FECHA.substr(0, 4)}
                        </td>
                        <td>{datos.PRECIP} mm</td>
                        <td>{datos.EVAP} mm</td>
                        <td>{datos.TMAX} °C</td>
                        <td>{datos.TMIN} °C</td>
                        <td>
                          {/* <button onClick={() => this.deleteDato(datos._id)} className="btn light blue darken-4">
                                                            <i className="material-icons">delete</i>
                                                        </button> */}
                          {/* <button onClick={() => this.editDato(datos._id)} className="btn light blue darken-4" style={{marginTop: '4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default App;
