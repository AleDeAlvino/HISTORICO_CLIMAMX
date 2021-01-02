import { ISO_8601 } from "moment";
import React, { Component } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import Input from "../components/Input";
import MultiSelectAll from "../components/MultiSelectAll";

const options = [
  { value: "rojo", label: "rojo" },
  { value: "azul", label: "azul" },
  { value: "verde", label: "verde" },
  { value: "blanco", label: "blanco" }
];

const animatedComponents = makeAnimated();


class App extends Component {
  constructor() {
    super();
    this.state = {
      id_estacion: "",
      FECHA: "".replace("-", "/"),
      PRECIP: "",
      EVAP: "",
      TMAX: "",
      TMIN: "",
      datos: [],
      _id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addDato = this.addDato.bind(this);
  }


  addDato(e) {
    if (this.state._id) {
      fetch(`/api/dato/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Dato Actualizado" });
          this.setState({
            FECHA: "",
            PRECIP: "",
            EVAP: "",
            TMAX: "",
            TMIN: "",
          });
          this.fetchDato();
        });
    } else {
      fetch("/api/dato", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Poducto guardado" });
          this.setState({
            id_estacion: "",
            FECHA: "",
            PRECIP: "",
            EVAP: "",
            TMAX: "",
            TMIN: "",
          });
          this.fetchDato();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.fetchDato();
  }

  fetchDato() {
    fetch("/api/dato")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ datos: data });
        console.log(this.state.datos);
      });
  }

  deleteDato(id) {
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
          this.fetchDato();
        });
    }
  }

  editDato(id) {
    fetch(`/api/dato/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          id_estacion: data.id_estacion,
          FECHA: data.FECHA,
          PRECIP: data.PRECIP,
          EVAP: data.EVAP,
          TMAX: data.TMAX,
          TMIN: data.TMIN,
          _id: data._id,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  render() {
    return (
        
      <div>
        {/* {Navigation} */}
        <nav className="navbar navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand">HISTORICO</a>

            <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[options[1], options[2]]}
        isMulti
        options={options}
      />
          </div>

          <MultiSelectAll />


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
                    <th scope="col">id_estacion</th>
                    <th scope="col">FECHA</th>
                    <th scope="col">PRECIP</th>
                    <th scope="col">EVAP</th>
                    <th scope="col">TMAX</th>
                    <th scope="col">TMIN</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.datos.map((datos) => {
                    return (
                      <tr key={datos._id}>
                        <td>{datos.id_estacion}</td>
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
}

export default App;
