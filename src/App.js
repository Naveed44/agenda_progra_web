import './App.css';
import React from 'react';
import 'rmwc/dist/styles'
import '@fortawesome/fontawesome-free/js/all.js';
import Contact from './Contact';
import {MDCDialog} from '@material/dialog';
import {MDCTextField} from '@material/textfield';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        contactslist: [],
        favcontacts: []
      }
      this.modal_new = undefined;
      this.modal_two = undefined;//New modal
      this.txtName = undefined;
      this.txtTel = undefined;
      this.txtName2 = undefined;
      this.txtTel2 = undefined;

      this.inputName = undefined;
      this.inputTel = undefined;
      this.inputName2 = undefined;
      this.inputTel2 = undefined;

      this.open_modal = this.open_modal.bind(this);
      this.open_modal_two = this.open_modal_two.bind(this);//Part two
      this.clear_inputs = this.clear_inputs.bind(this);
      this.new_contact = this.new_contact.bind(this);
      this.take_contact = this.take_contact(this);
  }

  getAvailableID(data){
    if(data.length === 0) return 1;
    return Math.max(...data.map(item => item.id)) +1;
  }

  open_modal(){
    this.modal_new.open();
  }

  open_modal_two(){
    this.modal_two.open();
    this.take_contact();
  }

  clear_inputs(){
    this.txtName.value = "";
    this.txtTel.value = "";
  }

  new_contact(){
    const newcontact = {
      id: this.getAvailableID(this.state.contactslist),
      name: this.inputName,
      phonenumber: this.inputTel
    }
    this.setState({
      contactslist: [...this.state.contactslist, newcontact]
    })
    this.clear_inputs();
  }

  take_contact(contact){
    const that = this;
      return function() {
        const index = that.state.contactslist.findIndex(item => item.id === contact.id);
        console.info(index);
        localStorage.setItem("contactID", contact.id);
        }
  }

  render(){
    return (
      <>
        <header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">
              <i className="fas fa-bars"></i>
            </button>
              <span className="mdc-top-app-bar__title">Agenda shida</span>
            </section>
          </div>
        </header>
        <div className="appbody">
          <ul className="mdc-list mdc-list--two-line" onClick = {this.open_modal_two}>
            {
              this.state.contactslist.length === 0 && (
                <li className="mdc-list-item mdc-list-item--disabled">
                  <span className="mdc-list-item__ripple"></span>
                  <span className="mdc-list-item__text">No hay contactos.</span>
              </li>
              )
            }
            {
              this.state.contactslist.map(contact => ([
                <Contact onChange = {this.take_contact(contact)} key={contact.id} contactName={contact.name} phoneNumber={contact.phonenumber}></Contact>
              ]))
              
            }
          </ul>
          <button onClick={this.open_modal} className="mdc-fab btnplus" aria-label="plus">
            <div className="mdc-fab__ripple"></div>
            <span className="mdc-fab__icon material-icons">
              <i className="fas fa-plus"></i>
            </span>
          </button>
        </div>

        {/* modal xd */}
        <div className="mdc-dialog modal_new">
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="my-dialog-title"
              aria-describedby="my-dialog-content">
              <h2 className="mdc-dialog__title" id="my-dialog-title">
              Nuevo contacto
              </h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                <label className="mdc-text-field mdc-text-field--filled input_name">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputName" ref={this.inputName}>Nombre</span>
                  <input onChange={event => this.inputName = event.target.value} className="mdc-text-field__input" type="text" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_tel">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputTel" ref={this.inputTel}>Telefono</span>
                  <input onChange={event => this.inputTel = event.target.value} className="mdc-text-field__input" type="number" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label>
              </div>
              <div className="mdc-dialog__actions">
                
                <button onClick={this.new_contact} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">OK</span>
                </button>

                <button onClick={this.clear_inputs} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Cancel</span>
                </button>
                
              </div>
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>

        {/* modal xd */}
        <div className="mdc-dialog modal_two">
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="my-dialog-title"
              aria-describedby="my-dialog-content">
              <h2 className="mdc-dialog__title" id="my-dialog-title">
              Contacto
              </h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                <label className="mdc-text-field mdc-text-field--filled input_name2">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputName" ref={this.inputName2}>Nombre</span>
                  <input onChange={event => this.inputName2 = event.target.value} className="mdc-text-field__input" type="text" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_tel2">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputTel" ref={this.inputTel2}>Telefono</span>
                  <input onChange={event => this.inputTel2 = event.target.value} className="mdc-text-field__input" type="number" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label>
              </div>
              <div className="mdc-dialog__actions">
              <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Save</span>
                </button>

                <button onClick={this.clear_inputs} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Delete</span>
                </button>

                <button onClick={this.clear_inputs} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Cancel</span>
                </button>
      
              </div>
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>
      </>
    )
  }

  componentDidMount(){
    this.modal_new = new MDCDialog(document.querySelector('.modal_new'));
    this.modal_two = new MDCDialog(document.querySelector('.modal_two'));
    this.txtName = new MDCTextField(document.querySelector('.input_name'));
    this.txtTel = new MDCTextField(document.querySelector('.input_tel'));
    this.txtName2 = new MDCTextField(document.querySelector('.input_name2'));
    this.txtTel2 = new MDCTextField(document.querySelector('.input_tel2'));
  }

}

export default App;
